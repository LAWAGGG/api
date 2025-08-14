import { useEffect, useState } from "react"
import { data, Link, useParams } from "react-router-dom"
import { BASE_URL } from "../utils/utils"

export default function ProjectDetail() {
    const [project, setProject] = useState({})
    const [creator, setcreator] = useState("")
    const [desc, setdesc] = useState("")
    const [image, setimage] = useState("")
    const [repo, setrepo] = useState("")
    const [teacher, setteacher] = useState("")
    const [title, settitle] = useState("")
    const [language, setLanguage] = useState([])
    const params = useParams()

    async function fetchProject() {
        const res = await fetch(`${BASE_URL}/project/${params.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        const data = await res.json()
        console.log(data)
        setProject(data.Project)
        setcreator(data.Project.creator)
        setdesc(data.Project.description)
        setimage(data.Project.image_url)
        setrepo(data.Project.repo_link)
        setteacher(data.Project.teacher)
        settitle(data.Project.title)
        setLanguage(data.Project.language)
    }

    useEffect(() => {
        fetchProject()
    }, [])

    return (
        <>
            <div className="ProjectPage">
                <div className="ProjectImage">
                    <Link className="back" to="/projects">&larr; Back</Link>
                    <img src={image} alt="Project Image" />
                </div>
                <div className="ProjectContents">
                    <div className="DetailProject">
                        <h1>{title}</h1>

                        <p>Teacher:</p>
                        <p>{teacher}</p>

                        <p>Creator:</p>
                        <p>{creator}</p>

                        <p>Repository:</p>
                        <p>
                            <a href={repo} rel="noopener noreferrer">
                                GitHub Link
                            </a>
                        </p>

                        <p>Language:</p>
                        <div className="languages">
                            {language.map((item, i) => (
                                <span key={i} className="lang">{item}</span>
                            ))}
                        </div>

                        <p>Description :</p>
                        <p className="description-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque veniam velit, recusandae earum quidem consequuntur quo, voluptas sequi repudiandae iure dicta quos voluptates hic a magnam cumque illo nam? Reiciendis.</p>
                    </div>
                </div>
            </div>
        </>
    )
}