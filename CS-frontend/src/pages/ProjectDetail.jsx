import { useEffect, useState } from "react"
import { data, Link, useParams } from "react-router-dom"
import { BASE_URL } from "../utils/utils"

export default function ProjectDetail() {
    const [project, setProject] = useState({})
    const { id } = useParams()

    async function fetchProject() {
        const res = await fetch(`/gallery/SPES-Project.json`)
        const data = await res.json()
        const found = data.find(item => item.id === Number(id))
        console.log(data)
        setProject(found)
    }

    useEffect(() => {
        fetchProject()
    }, [])

    return (
        <>
            <div className="ProjectPage">
                <div className="ProjectImage">
                    <Link className="back" to="/projects">&larr; Back</Link>
                    <img src={project.image} alt="Project Image" />
                </div>
                <div className="ProjectContents">
                    <div className="DetailProject">
                        <h1>{project.title}</h1>

                        <p>Teacher:</p>
                        <p>{project.teacher}</p>

                        <p>Creator:</p>
                        <p>{project.creator}</p>

                        <p>Repository:</p>
                        <p>
                            <a href={project.repo} rel="noopener noreferrer">
                                GitHub Link
                            </a>
                        </p>

                        <p>Language:</p>
                        <div className="languages">
                            {project.language?.split("\n").map((item, i) => (
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