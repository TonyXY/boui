<template>
  <div
    class="bo-date-picker"
    v-click-outside="handleBlur"
  >
    <bo-input
      suffix-icon="rili"
      name="date"
      placeholder="请选择"
      :value="formateDate"
      @input="handleInput"
      @focus="handleFocus"
      @change="handleChange"
    ></bo-input>
    <div
      class="bo-date-picker-content"
      v-show="isVisible"
    >
      <template v-if="mode==='dates'">
        <div class="bo-date-picker-header">
          <span class="cell">
            <bo-icon
              icon="prev"
              @click="changeYear(-1)"
            ></bo-icon>
          </span>
          <span class="cell">
            <bo-icon
              icon="left"
              @click="changeMonth(-1)"
            ></bo-icon>
          </span>
          <span class="title">
            <b @click="mode='years'">{{tempTime.year}}年</b>
            <b @click="mode='months'">{{tempTime.month+1}}月</b>
          </span>
          <span class="cell">
            <bo-icon
              icon="right"
              @click="changeMonth(1)"
            ></bo-icon>
          </span>
          <span class="cell">
            <bo-icon
              icon="next"
              @click="changeYear(1)"
            ></bo-icon>
          </span>
        </div>
        <div>
          <span
            v-for="week in weeks"
            class="cell"
            :key="week"
          >{{week}}</span>
        </div>
        <div
          v-for="i in 6"
          :key="`row_${i}`"
        >
          <span
            v-for="j in 7"
            :key="`col_${j}`"
            class="cell cell-dates"
            @click="selectDate(getCurrentDate(i,j))"
            :class="{
                isNotCurrentMonth:!isCurrentMonth(getCurrentDate(i,j)),
                isToday:isToday(getCurrentDate(i,j)),
                isSelect:isSelect(getCurrentDate(i,j))
            }"
          >{{getCurrentDate(i,j).getDate()}}</span>
        </div>
      </template>
      <template v-if="mode==='years'">
        <div class="bo-date-picker-header">
          <span class="cell">
            <bo-icon
              icon="prev"
              @click="changeYear(-10)"
            ></bo-icon>
          </span>
          <span class="title">
            <b @click="mode='years'">{{startYear}}年-{{startYear+9}}年</b>
          </span>
          <span class="cell">
            <bo-icon
              icon="next"
              @click="changeYear(10)"
            ></bo-icon>
          </span>
        </div>
        <div>
          <span
            v-for="m in 10"
            :key="`month_${m}`"
            class="cell cell-months"
            @click="changeToYear(startYear+m-1)"
            :class="{isSelectYear:time.year === startYear+m-1 }"
          >
            {{startYear+m-1}}年
          </span>
        </div>
      </template>
      <template v-if="mode==='months'">
        <div class="bo-date-picker-header">
          <span class="cell">
            <bo-icon
              icon="prev"
              @click="changeYear(-1)"
            ></bo-icon>
          </span>
          <span class="title">
            <b @click="mode='years'">{{tempTime.year}}年</b>
          </span>
          <span class="cell">
            <bo-icon
              icon="next"
              @click="changeYear(1)"
            ></bo-icon>
          </span>
        </div>
        <div>
          <span
            v-for="(month,index) in months"
            :key="month"
            @click="changeToMonth(index)"
            class="cell cell-months"
            :class="{isSelectMonth:time.month === index&&tempTime.year === time.year }"
          >
            {{month}}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import clickOutside from "v-click-outside";
function getYearMonthDay(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate(); // 获取日期的 getDay
  return [year, month, day];
}
export default {
  name: "bo-date-picker",
  directives: {
    clickOutside: clickOutside.directive
  },
  props: {
    value: {
      type: [String, Date],
      default: () => new Date()
    }
  },
  data() {
    // 只执行一次
    // 我需要通过用户传入的value 算出一个 年月日来   2012-10-04
    let [year, month, day] = getYearMonthDay(this.value || new Date()); // 根据当前的时间算出一个年月日
    return {
      isVisible: false,
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
      months: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      mode: "dates", // years || months
      time: {
        // 稍后我们现实的时间是通过 time来显示的
        year,
        month,
        day
      },
      tempTime: {
        // 我们操作的是这个时间
        year,
        month,
        day
      }
    };
  },
  computed: {
    visibleData() {
      const oneDayTime = 3600 * 24 * 1000;
      let firstDay = new Date(this.tempTime.year, this.tempTime.month, 1);
      let weekDay = firstDay.getDay();
      weekDay = weekDay === 0 ? 7 : weekDay;
      let start = firstDay - weekDay * oneDayTime;
      let arr = [];
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(start + i * oneDayTime));
      }
      return arr;
    },
    formateDate() {
      if (this.value) {
        let { year, month, day } = this.time;
        return `${year}-${(month + 1 + "").padStart(2, 0)}-${(
          day + ""
        ).padStart(2, 0)}`;
      }
    },
    startYear() {
      // 2023  2020   2023 -  2023%10 = 3
      return this.tempTime.year - (this.tempTime.year % 10);
    }
  },
  watch: {
    value(newValue) {
      let [year, month, day] = getYearMonthDay(newValue);
      this.time = {
        year,
        month,
        day
      };
      this.tempTime = { ...this.time }; // 拷贝一个time属性用于后续选择的更改
    }
  },
  methods: {
    handleChange(e) {
        let newValue =e.target.value;
        let regExp = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
        if(newValue.match(regExp)){
            this.$emit('input',new Date(RegExp.$1,RegExp.$2-1,RegExp.$3));
        }else{
            e.target.value = this.formateDate; 
        }
        this.handleBlur();
    },
    handleFocus() {
      this.isVisible = true;
    },
    handleBlur() {
      this.isVisible = false;
      this.mode = "dates";
    },
    getCurrentDate(i, j) {
      return this.visibleData[(i - 1) * 7 + (j - 1)];
    },
    isCurrentMonth(date) {
      let { year, month } = this.tempTime;
      let [y, m] = getYearMonthDay(date);
      return year === y && month === m;
    },
    isToday(date) {
      let [y, m, d] = getYearMonthDay(date);
      let [year, month, day] = getYearMonthDay(new Date());
      return year === y && month === m && day === d;
    },
    isSelect(date) {
      let [y, m, d] = getYearMonthDay(date);
      let { year, month, day } = this.time;
      return year === y && month === m && day === d;
    },
    selectDate(date) {
      this.$emit("input", date);
      this.handleBlur();
    },
    changeMonth(count) {
      const oldDate = new Date(this.tempTime.year, this.tempTime.month);
      const newDate = oldDate.setMonth(oldDate.getMonth() + count);
      let [year, month] = getYearMonthDay(new Date(newDate));
      this.tempTime.year = year;
      this.tempTime.month = month;
    },
    changeYear(count) {
      const oldDate = new Date(this.tempTime.year, this.tempTime.month);
      const newDate = oldDate.setFullYear(oldDate.getFullYear() + count);
      let [year, month] = getYearMonthDay(new Date(newDate));
      this.tempTime.year = year;
      this.tempTime.month = month;
    },
    changeToYear(year) {
      this.changeYear(year - this.tempTime.year);
      this.mode = "months";
    },
    changeToMonth(month) {
      this.changeMonth(month - this.tempTime.month);
      this.mode = "dates";
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/_var.scss";
.bo-date-picker {
  border: 1px solid red;
  display: inline-block;
  .bo-date-picker-content {
    position: absolute;
    z-index: 10;
    user-select: none;
    width: 280px;
    background: #fff;
    box-shadow: 1px 1px 2px $primary, -1px -1px 2px $primary;
    .bo-date-picker-header {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .bo-icon {
        height: 16px;
        width: 16px;
      }
      .title {
        font-size: 14px;
        flex: 1;
        text-align: center;
      }
    }
    .cell {
      font-size: 12px;
      width: 40px;
      height: 40px;
      display: inline-block;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
      &.cell-dates:hover:not(.isNotCurrentMonth):not(.isSelect) {
        color: $primary;
      }
      &.cell-months {
        width: 70px;
        height: 40px;
        &:hover {
          color: $primary;
        }
      }
    }
  }
  .isNotCurrentMonth {
    color: #ccc;
  }
  .isToday {
    color: $primary;
    font-weight: bold;
  }
  .isSelectYear,
  .isSelectMonth {
    color: $primary;
  }
  .isSelect {
    color: #fff;
    border-radius: 50%;
    background: $primary;
  }
}
</style>