"use client";
import React from 'react'
import { FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import Link from "next/link";
import { useThemeContext } from './customHook/themeHook';
import data from "@/app/components/jsondata.json";
import Head from "next/head";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#DDB7E9', '#82ca9d'];



const DashboardVisualization = () => {
 
  const {darkTheme} = useThemeContext();


  const ThemeFontColorHandler = darkTheme ? 'darkTheme-hover-aside-icon darkTheme-font-color':'lightTheme-hover-aside-icon darkTheme-font-color';
  const fontColorClassName = darkTheme ? 'darkTheme-font-color' : 'lightTheme-font-color';
  
  const limitData = data.slice(0, 20);

  const regionlimitedData = data.slice(0, 20);

  const topicCount: Record<string, number> = limitData.reduce((count: { [x: string]: any; }, insight: { topic: any; }) => {
    const { topic } = insight;
    count[topic] = (count[topic] || 0) + 1;
    return count;
  }, {} as Record<string, number>);
  
  // Count the number of insights for each region
  const regionCount:Record<string, number> = regionlimitedData.reduce((count: { [x: string]: any; }, insight: { region: any; }) => {
    const { region } = insight;
    count[region] = (count[region] || 0) + 1;
    return count;
  }, {} as Record<string, number>);
  
  // Convert topic and region counts to data arrays for charts
  const topicData = Object.keys(topicCount).map((topic) => ({
    name: topic,
    value: topicCount[topic],
  }));
  
  const regionData = Object.keys(regionCount).map((region) => ({
    name: region,
    value: regionCount[region],
  }));
  

  return (
    <div className="dashboard mt-5 max-w-3xl lg:max-w-6xl mx-auto">
         
      <div className="text-right">
        <Link
        href="/filterData"
        className="px-2 py-2 rounded-md font-semibold border text-opacity-95 bg-[#2f3349] text-[#d0d4f1] hover:bg-[#d0d4f1] hover:text-[#2f3349] "
        >
          Filter Data
        </Link>
      </div>
      <div className="bar-chart my-5 border rounded-md border-[#d0d4f1] p-5 border-opacity-75">
        <h1 className={`text-[20px] ${fontColorClassName}}`}>
          Statistics
        </h1>
        <h2 className="mb-5">Intensity, Likelihood, and Relevance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={limitData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="topic" />
            <YAxis />
            <Tooltip content={<CustomTooltip active={false} payload={[]} label={""} />} />
            <Bar dataKey="intensity" fill="#836af9" name="Intensity" />
            <Bar dataKey="likelihood" fill="#82ca9d" name="Likelihood" />
            <Bar dataKey="relevance" fill="#ffbd1f" name="Relevance" />
            <Legend  />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bar-chart my-5 border rounded-md border-[#d0d4f1] p-5 border-opacity-75">
      <h2>Topic Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={topicData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
          >
            {topicData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip/>

          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
      </div>

      <div className="bar-chart my-5 border rounded-md border-[#d0d4f1] p-5 border-opacity-75">
      <h2>Region Wise Topic Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={regionData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip/>
          <Legend />
          <Bar dataKey="value" fill="#836af9" />
        </BarChart>
      </ResponsiveContainer>
      </div>
      <p className="mb-5 text-center text-sm">
              {" "}
              <a
                href="https://www.harmanpreetsingh.me/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Created by{" "}
                <span className="text-white hover:underline">
                  Harmanpreet Singh
                </span>
              </a>
            </p>
    </div>
  );
};


export default DashboardVisualization;


type CustomTooltipProps = {
  active: boolean;
  payload: any[];
  label:string;
}

const CustomTooltip:FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
   
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip darkTheme-border max-w-sm">
        <p className="">{`Topic: ${label}`}</p>
        <span>Title:</span>
        <p className="text-sm">{`${data.title}`}</p>
        <div className="border-t border-slate-400 my-2">
          <p className="text-[#836af9]">{`Intensity: ${data.intensity}`}</p>
        <p className="text-[#82ca9d]">{`Likelihood: ${data.likelihood}`}</p>
        <p className="text-[#ffbd1f]">{`Relevance: ${data.relevance}`}</p>
        </div>
      </div>
    );
  }
  return null;
};
