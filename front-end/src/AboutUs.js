import { useState, useEffect } from 'react'
import axios from 'axios'
import './AboutUs.css'

const About = props => {
  const [aboutData, setAboutData] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
      .then(response => {
        setAboutData(response.data.about)
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [])

  return (
    <div className="About">
      <h1>About Us</h1>
      {error && <p className="error">{error}</p>}
      {!loaded && <p>Loading...</p>}
      {loaded && aboutData && (
        <div className="about-content">
          <h2>{aboutData.name}</h2>
          <img src={aboutData.imageUrl} alt={aboutData.name} className="about-image" />
          {aboutData.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export default About