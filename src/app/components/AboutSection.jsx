"use client"
import React, { useEffect, useState } from 'react';
import { client, urlFor } from '../lib/Sanity';
import Image from 'next/image';
import { motion } from 'framer-motion';

async function getData(type) {
  const query = `*[_type=="${type}"]`;
  const data = await client.fetch(query);
  return data;
}

const variants = {
  default: { width: 0 },
  active: { width: 'calc(100% - 0.75rem)' },
};
function FrontOfCard() { return (<div className="absolute inset-0 w-full h-full flex justify-center items-center bg-gray-900 transition-all duration-100 delay-200 z-20 hover:opacity-0">      FRONT OF CARD    </div>); }
function BackOfCard() { return (<div className="absolute inset-0 w-full h-full flex justify-center items-center bg-black transition-all z-10 card-back">      BACK OF CARD    </div>); }
const AboutSection = () => {
  const [tab, setTab] = useState('skills');
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setIsPending(true);
      try {
        const result = await getData(tab);

        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsPending(false);
      }
    }

    fetchData();
  }, [tab]);

  const handleTabChange = (id) => {
    setTab(id);
  };

  const renderContent = () => {
    switch (tab) {
      case 'skills':
        return (
          <div className="grid md:grid-cols-4 grid-cols-3 text-pink-300 gap-5">
            {data.map((skill) => (
              <div key={skill._id} className="relative">
                {skill.image && (
                  <div
                    className="h-5 w-5 md:h-7 md:w-7 relative group"
                    style={{ background: `url(${urlFor(skill.image.asset).url()})`, backgroundSize: "cover" }}
                  >
                    <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 ">
                      <span>{skill.name}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}

          </div>



        );
      case 'edu':
        return (
          <ul className="list-disc text-pink-300 pl-2">
            {data.map((edu) => (
              <li key={edu._id}>{edu.name} from {edu.description}</li>
            ))}
          </ul>
        );
      case 'certificate':
        return (
          <ul className="list-disc text-pink-300 pl-2">
            {data.map((cert) => (
              <a href={cert.previewUrl}><li key={cert._id}>{cert.name},{cert.description}</li></a>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <img
          src="/image/aboutprofile.jpg"
          alt="about-section"
          object="cover"
          className="rounded-lg h-[300px] md:w-[400px] lg:h-[600px] lg:w-[500px]"
        />


        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
            Excited to be your go-to tech maestro based in India! 🇮🇳✨ I'm not just your Front-End Developer, Web Designer, and Software Developer extraordinaire—I'm now diving into the magical realms of Machine Learning and AI! 🚀🤖

            Picture this: a symphony of HTML, CSS, Tailwind CSS, and JavaScript, blending seamlessly with the tech symphonies of C++ and Java. 🎶💻 Now, let's sprinkle in some AI magic to create experiences that'll make waves in the digital universe! 🌐💡

            Fueled by an insatiable curiosity and an unquenchable thirst for knowledge, I'm not just coding; I'm orchestrating digital masterpieces! 🌟🔍 Ready to embark on this exhilarating journey and turn ideas into extraordinary realities? Let's go! 🌈💫
          </p>
          <div className="flex flex-row justify-start mt-8">
            <button onClick={() => handleTabChange('skills')}>
              <p className={`mr-3 font-semibold hover:text-pink-600 ${tab === 'skills' ? 'text-pink-600' : 'text-[#ADB7BE]'}`}>
                Skills
              </p>
              <motion.div
                animate={tab === 'skills' ? 'active' : 'default'}
                variants={variants}
                className="h-1 bg-primary-500 mt-2 mr-3"
              ></motion.div>
            </button>
            <button onClick={() => handleTabChange('edu')}>
              <p className={`mr-3 font-semibold hover:text-pink-600 ${tab === 'edu' ? 'text-pink-600' : 'text-[#ADB7BE]'}`}>
                Education
              </p>
              <motion.div
                animate={tab === 'edu' ? 'active' : 'default'}
                variants={variants}
                className="h-1 bg-primary-500 mt-2 mr-3"
              ></motion.div>
            </button>
            <button onClick={() => handleTabChange('certificate')}>
              <p className={`mr-3 font-semibold hover:text-pink-600 ${tab === 'certificate' ? 'text-pink-600' : 'text-[#ADB7BE]'}`}>
                Certifications
              </p>
              <motion.div
                animate={tab === 'certificate' ? 'active' : 'default'}
                variants={variants}
                className="h-1 bg-primary-500 mt-2 mr-3"
              ></motion.div>
            </button>
          </div>
          <div className="mt-8">{isPending ? 'Loading...' : renderContent()}</div>
        </div>
      </div>

    </section>
  );
};

export default AboutSection;
