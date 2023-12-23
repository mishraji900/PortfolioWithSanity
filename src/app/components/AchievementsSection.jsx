"use client";
import React,{ useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { client, urlFor } from '../lib/Sanity';
const AnimatedNumbers = dynamic(
  () => {
    return import("react-animated-numbers");
  },
  { ssr: false }
);

async function getExperienceYears() {
  const query = `*[_type=='Experience']`;
  const expData = await client.fetch(query);
  
  // Check if expData is not empty and has the required structure
  if (expData && expData.length > 0) {
    // Assuming expData is an array, extract the first element (if there are multiple) and get the "exp" value
    const expValue = expData[0].exp || "0";
    return expValue;
  } else {
    // If expData is empty or doesn't have the required structure, set default value to "0"
    return "0";
  }
}
async function getDataAnalysisProjects() {
  const query = `*[_type=='Dap']`;
  const dapData = await client.fetch(query);
  
  // Check if dapData is not empty and has the required structure
  if (dapData && dapData.length > 0) {
    // Assuming dapData is an array, extract the first element (if there are multiple) and get the "value" property
    const dapValue = dapData[0].dap || "0";
    
    return dapValue;
  } else {
    // If dapData is empty or doesn't have the required structure, set default value to "0"
    return "0";
  }
}

async function getWebDevProjects() {
  const query = `*[_type=='Wdp']`;
  const wdpData = await client.fetch(query);

  // Check if wdpData is not empty and has the required structure
  if (wdpData && wdpData.length > 0) {
    // Assuming wdpData is an array, extract the first element (if there are multiple) and get the "value" property
    const wdpValue = wdpData[0].wdp || "0";
    return wdpValue;
  } else {
    // If wdpData is empty or doesn't have the required structure, set default value to "0"
    return "0";
  }
}


const AchievementsSection = () => {
  const [webDevProjects, setWebDevProjects] = useState([]);
  const [dataAnalysisProjects, setDataAnalysisProjects] = useState([]);
  const [experienceYears, setExperienceYears] = useState([]);

  useEffect(() => {
    // Fetch the data when the component mounts
    async function fetchData() {
      const wdpdata = await getWebDevProjects();
      const dapdata = await getDataAnalysisProjects();
      const expdata = await getExperienceYears();
      setWebDevProjects(wdpdata);
      setDataAnalysisProjects(dapdata);
      setExperienceYears(expdata);
    }
    fetchData()
    
  }, []);

  console.log(webDevProjects)
  
  

  const achievementsList = [
    {
      metric: "web dev Projects",
      value: webDevProjects,
      postfix: "+",
    },
    {
      postfix: "+",
      metric: "Data Analysis Project",
      value: dataAnalysisProjects,
    },
    {
      metric: "Experience Years",
      value: experienceYears,
      postfix: '+'
    },
  ];
  return (
    <div className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
      <div className="sm:border-[#33353F] sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between">
        {achievementsList.map((achievement, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
            >
              <h2 className="text-white text-4xl font-bold flex flex-row">
                {achievement.prefix}
                <AnimatedNumbers
                  includeComma
                  animateToNumber={parseInt(achievement.value)}
                  locale="en-US"
                  className="text-white text-4xl font-bold"
                  configs={(_, index) => {
                    return {
                      mass: 1,
                      friction: 100,
                      tensions: 140 * (index + 1),
                    };
                  }}
                />
                {achievement.postfix}
              </h2>
              <p className="text-[#ADB7BE] text-base">{achievement.metric}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsSection;