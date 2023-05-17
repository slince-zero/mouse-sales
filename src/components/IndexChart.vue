<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <div class="felx justify-center">
          <span class="text-sm">订单统计</span>
          <div>
            <el-check-tag
              v-for="(item, index) in options"
              :key="index"
              :checked="current == item.value"
              style="margin-right: 8px"
              @click="handleChoose(item.value)"
            >
              {{ item.text }}
            </el-check-tag>
          </div>
        </div>
      </template>
      <!-- card body -->
      <div ref="el" id="chart" style="width: 100%; height: 300px"></div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { getStatistics3 } from "~/api/index.js";
import { useResizeObserver } from "@vueuse/core";
const current = ref("week");
const options = [
  {
    text: "近一个月",
    value: "month",
  },
  {
    text: "近一周",
    value: "week",
  },
  {
    text: "近24小时",
    value: "hour",
  },
];

// 订单统计近一周，近一个月，近24小时切换
const handleChoose = (type) => {
  current.value = type;
  getData();
};

var myChart = null;
onMounted(() => {
  var chartDom = document.getElementById("chart");
  myChart = echarts.init(chartDom);
  getData();
});

function getData() {
  let option = {
    xAxis: {
      type: "category",
      data: [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [],
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };

  myChart.showLoading();
  getStatistics3(current.value)
    .then((res) => {
      option.xAxis.data = res.x;
      option.series[0].data = res.y;
      myChart.setOption(option);
    })
    .finally(() => {
      myChart.hideLoading();
    });
}

onBeforeUnmount(() => {
  if (myChart) {
    echarts.dispose(myChart);
  }
});

const el = ref();
useResizeObserver(el, (entries) => {
  myChart.resize();
});
</script>
