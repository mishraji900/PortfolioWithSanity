"use client"
import React, { useState, useEffect } from 'react';
import { client, urlFor } from '../lib/Sanity';
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion"

async function getProjectData() {
  const query = '*[_type=="project"]';
  const data = await client.fetch(query);
  return data;
}

export default function Practice() {
  const [projects, setProjects] = useState([]);
  const [selectedTag, setSelectedTag] = useState('web'); // State to track selected tag

  useEffect(() => {
    async function fetchData() {
      const data = await getProjectData();
      setProjects(data);
    }

    fetchData();
  }, []); // Fetch data on component mount

  const buttonStylesWeb = selectedTag === 'web'
    ? "text-fuchsia-400 border-pink-500"
    : "text-[#ADB7BE] border-slate-600 hover:border-white";

  const buttonStylesMLAI = selectedTag === 'ml/ai'
    ? "text-fuchsia-400 border-pink-500"
    : "text-[#ADB7BE] border-slate-600 hover:border-white";

  const filteredProjects = selectedTag
    ? projects.filter((project) => project.tag === selectedTag)
    : projects;

  return (
    <section id="projects">
      <h1 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">Projects</h1>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <button className={`${buttonStylesWeb} rounded-full border-2 px-6 py-3 text-xl cursor-pointer`} onClick={() => setSelectedTag('web')}>Web Dev</button>
        <button className={`${buttonStylesMLAI} rounded-full border-2 px-6 py-3 text-xl cursor-pointer`} onClick={() => setSelectedTag('ml/ai')}>Ml/Ai</button>
      </div>
      {filteredProjects.length > 0 ? (
        <ul className="grid md:grid-cols-3 gap-8 md:gap-12">
          {filteredProjects.map((data) => (
            <motion.div
              key={data._id}
              initial={{
                y: 50,
                opacity: 0
              }}
              animate={{
                y: 0,
                opacity: 1
              }}
              transition={{ duration: 1.5, delay: 0.4 }}
            >
              <ProjectCard
                key={data._id}
                title={data.name}
                description={data.description}
                imgUrl={urlFor(data.image.asset).url()}
                gitUrl={data.gitUrl}
                previewUrl={data.previewUrl}
              />
            </motion.div>
          ))}
        </ul>
      ) : (
        <p>No skills data found</p>
      )}
    </section>
  );
}