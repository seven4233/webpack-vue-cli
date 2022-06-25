<template>
  <div class="params">
    <div class="info">
      <div class="key">{{ itemParams.info ? itemParams.info.key : '' }}</div>
      <table
        v-for="(item, index1) in itemParams.info ? itemParams.info.set : ''"
        :key="index1"
      >
        <tr>
          <td>{{ item.key }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </table>
    </div>

    <div class="rule">
      <div class="key">{{ itemParams.rule ? itemParams.rule.key : '' }}</div>
      <table
        v-for="(table, index1) in itemParams.rule ? itemParams.rule.tables : ''"
        :key="index1"
      >
        <tr v-for="(item, index) in table" :key="index">
          <td>{{ item[0] }}</td>
          <td>{{ item[1] }}</td>
          <td>{{ item[2] }}</td>
          <td>{{ item[3] }}</td>
          <td>{{ item[4] }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['itemParams'],
};
</script>

<style lang="less" scoped>
.params {
  .info {
    margin: 20px 0;

    .key {
      height: 50px;
      padding: 10px 0 10px 20px;
      color: #000;
      font-weight: 600;
      font-size: 20px;
      font-style: italic;
    }
    table {
      margin: 0 auto;
      width: 90%;
      border-collapse: collapse;
      font-weight: 600;
      td {
        display: inline-block;
      }
      td:nth-child(1) {
        width: 50px;
      }
      td:nth-child(2) {
        width: 200px;
        color: rgb(255, 120, 154);
        padding: 0 0 0 30px;
      }
      tr {
        line-height: 1.875rem;
        border-bottom: 1px solid #ccc;
      }
      tr:nth-child(odd) {
        background: #fff;
      }
      tr:nth-child(even) {
        background: #f5fafa;
      }
    }
  }
  .rule {
    .key {
      height: 50px;
      padding: 10px 0 10px 20px;
      color: #000;
      font-weight: 600;
      font-size: 20px;
      font-style: italic;
    }
    table {
      margin: 10px auto 30px;
      text-align: center;
      width: 90%;
      border-collapse: collapse;

      tr {
        line-height: 1.875rem;
        text-align: center;

        border-bottom: 1px solid #ccc;
        td {
          width: 50px;
          color: #666;
          font-size: 12px;
        }
      }

      tr:nth-child(odd) {
        background: #fff;
      }
      tr:nth-child(even) {
        background: #f5fafa;
      }
      tr:nth-child(1) {
        background: rgb(255, 187, 198);
      }
    }
  }
}
</style>
