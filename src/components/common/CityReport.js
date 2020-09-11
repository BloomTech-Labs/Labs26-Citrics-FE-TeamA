import React from 'react';
import './styles/CityReport.scss';
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Chinese Score',
    dataIndex: 'chinese',
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: 'Math Score',
    dataIndex: 'math',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: 'English Score',
    dataIndex: 'english',
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '2',
    name: 'Jim Green',
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: '3',
    name: 'Joe Black',
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    key: '4',
    name: 'Jim Red',
    chinese: 88,
    math: 99,
    english: 89,
  },
];

const data2 = [
  {
    key: '1',
    name: 'Sam Wise',
    chinese: 89,
    math: 90,
    english: 90,
  },
  {
    key: '2',
    name: 'Joe Blow',
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: '3',
    name: 'Yeller Wine',
    chinese: 99,
    math: 99,
    english: 59,
  },
  {
    key: '4',
    name: 'Claudia White',
    chinese: 68,
    math: 96,
    english: 69,
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

function CityReport() {
  return (
    <div className="report-container">
      <div className="average-rent">
        <h1>Average Rent</h1>
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </div>
      <div className="weather">
        <h1>Weather</h1>
        <Table columns={columns} dataSource={data2} onChange={onChange} />
      </div>
    </div>
  );
}

export default CityReport;
