import { useEffect, useState } from "react"
import { BASE_URL } from "../utils/utils"
import { Link, useParams } from "react-router-dom"

export default function StudentDetail() {
    const [student, setStudent] = useState({})
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    async function fetchStudent() {
        setLoading(true)
       const res = await fetch("https://lawaggg.github.io/api/v1/SPES-Students.json");
        const data = await res.json()
        const found = data.find(item => item.id === id)
        setStudent(found || {})
        setLoading(false)
    }

    useEffect(() => {
        fetchStudent()
    }, [])

    return (
        <>
            <div className={`StudentDetailPage ${loading ? "loading" : ""}`}>
                <div className="StudentBg">
                    <Link className="backButton" to="/students">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back to Students
                    </Link>

                    {!loading && student && (
                        <div className="StudentDetailCard">
                            <div className="StudentImage">
                                <img src={student.profile_url} alt={student.name} />
                                <div className="imageOverlay"></div>
                                <div className="studentBadge">
                                    {student.position}
                                </div>
                            </div>
                            <div className="DetailProfile">
                                <h1>{student.name}</h1>
                                <div className="studentMeta">
                                    <span className="metaItem">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M5 20C5 16.134 8.13401 13 12 13C15.866 13 19 16.134 19 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        {student.gender == "L" ? "Laki laki" : "Perempuan"}
                                    </span>
                                    <span className="metaItem">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {student.birth_date}
                                    </span>
                                    <span className="metaItem">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Absen: {student.absen}
                                    </span>
                                </div>

                                <div className="studentBio">
                                    <h3>About Me</h3>
                                    <p>{student.description}</p>
                                </div>

                                <div className="studentSkills">
                                    <h3>Skills</h3>
                                    <div className="skillsList">
                                        {student.skill?.split(',').map((skill, i) => (
                                            <span key={i} className="skillTag">{skill.trim()}</span>
                                        ))}
                                    </div>
                                </div>

                                {student.sosmed && (
                                    <a href={student.sosmed} rel="noopener noreferrer" className="socialButton">
                                        Connect on Social Media 😁
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}