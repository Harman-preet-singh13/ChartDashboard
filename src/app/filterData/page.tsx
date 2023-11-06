"use client";

import React, { FC, useState } from "react";
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
import data from "@/app/components/jsondata.json";



const topicData = ["oil", "gas", "consumption", "market", "war", "export"]
const sectorData = ["Energy", "Environment"]
const regionData = ["Northern America", "World", "Eastern Europe"]
const sourceData = ["EIA", "Yes Bank", "World Bank","DOE EIA 2013 Energy Conference"]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#DDB7E9', '#82ca9d'];




const DashboardVisualization = () => {

  const [selectedTopic, setSelectedTopic] = useState(""); 
  const [selectedRegion, setSelectedRegion] = useState(""); 
  const [selectedSource, setSelectedSource] = useState(""); 
  const [selectedSector, setSelectedSector] = useState("");



  // Filter data based on the selected topic and region
  const filteredData = data.filter(
    (entry: { topic: string; region: string; source: string; sector: string; }) =>
      (selectedTopic === "" || entry.topic === selectedTopic) &&
      (selectedRegion === "" || entry.region === selectedRegion) &&
      (selectedSource === "" || entry.source === selectedSource) &&
      (selectedSector === "" || entry.sector === selectedSector)
  );

  // Apply a limit to the filtered data
  const limitFilteredData = filteredData.slice(0, 20);

  // Define a function to handle topic selection
  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
  };

  const handleSourceSelect = (source: string) => {
    setSelectedSource(source);
  };

  const handleSectorSelect = (sector: string) => {
    setSelectedSector(sector);
  };

  const topicCount: Record<string, number> = limitFilteredData.reduce((count: { [x: string]: any; }, insight: { topic: any; }) => {
    const { topic } = insight;
    count[topic] = (count[topic] || 0) + 1;
    return count;
  }, {} as Record<string, number>);

    // Convert topic and region counts to data arrays for charts
    const topics = Object.keys(topicCount).map((topic) => ({
      name: topic,
      value: topicCount[topic],
    }));

  return (
    <div className="my-5 dashboard max-w-3xl lg:max-w-6xl mx-auto">
      <h2 className="text-xl my-5">Filters:</h2>
      <div className="filter-data">
        
        {/* topic */}
        <div>
          <label>Select Topic:</label>
          <select
            onChange={(e) => handleTopicSelect(e.target.value)}
            value={selectedTopic}
            className="filter-select darkTheme-border"
          >
            <option value="">All Topics</option>
            {topicData.map((topic,index)=>{
              return(
                <option key={index} value={topic}>{topic}</option>
              )
            })}
          </select>
        </div>
            {/* region */}
        <div>
          <label>Select Region:</label>
          <select
            onChange={(e) => handleRegionSelect(e.target.value)}
            value={selectedRegion}
            className="filter-select darkTheme-border"
          >
            <option value="">All Regions</option>
            {regionData.map((region,index)=>{
              return (
                <option key={index} value={region}>{region}</option>
              )
            })}
          </select>
        </div>
            {/* sector */}
        <div>
          <label>Select Sector:</label>
          <select
            onChange={(e) => handleSectorSelect(e.target.value)}
            value={selectedSector}
            className="filter-select darkTheme-border"
          >
            <option value="">All Sector</option>
            {sectorData.map((sector,index)=>{
              return (
                <option key={index} value={sector}>{sector}</option>
              )
            })}
          </select>
        </div>
            {/* source  */}
        <div>
          <label>Select Source:</label>
          <select
            onChange={(e) => handleSourceSelect(e.target.value)}
            value={selectedSource}
            className="filter-select darkTheme-border"
          >
            <option value="">All Source</option>
            {sourceData.map((source,index)=>{
              return (
                <option key={index} value={source}>{source}</option>
              )
            })}
          </select>
        </div>
      </div>
      <div className="chart">
        <div className="bar-chart my-5 border rounded-md border-[#d0d4f1] p-5 border-opacity-75">
          <h2>Intensity, Likelihood, and Relevance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={limitFilteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="topic" />
              <YAxis />
              <Tooltip content={<CustomTooltip active={false} payload={[]} label={""} />} />
              <Bar dataKey="intensity" fill="#8884d8" name="Intensity" />
              <Bar dataKey="likelihood" fill="#82ca9d" name="Likelihood" />
              <Bar dataKey="relevance" fill="#ffc658" name="Relevance" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bar-chart my-5 border rounded-md border-[#d0d4f1] p-5 border-opacity-75">
      <h2>Topic Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={topics}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
          >
            {topics.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip/>

          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
      </div>
      </div>
      <p className="my-5 text-center text-sm">
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
      <div className="custom-tooltip max-w-sm">
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
