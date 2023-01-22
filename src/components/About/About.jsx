import React from 'react'
import a from './About.module.css'

const About = () => {
  return (
    <div className={a.container}>
        <div className={a.about}>
            <h1>About</h1> 
            <p>
            Compass is a single page applicatio that allows users to explore different countries and create custom activities and link to one or several countries. The app provides detailed information on each country, including its capital, subregion, area and population. Users can search, filter, and order countries based on their preferences and create custom activities.


            <h2>Features:</h2> 

            Search: Users can search for countries by name, region, or language
            Filtering: Users can filter countries based on various criteria such as climate, population, and currency
            Ordering: Users can order countries based on their preferences
            Itineraries: Users can create custom itineraries that include activities such as sightseeing, dining, and shopping

            <h2>Technical specifications:</h2> 

            Front-end: React, Redux, pure CSS
            Back-end: Node.js with Express
            Database: PostgreSQL and Sequelize
            Development plan:

            <h2>About me:</h2>
            
            <a href='https://www.linkedin.com/in/mijailpulgar/' ><i class="fab fa-linkedin"></i></a>
            <a href='https://github.com/MijailDesigns'><i class="fab fa-github"></i></a>

            </p>  
        </div>
    </div>
  )
}

export default About