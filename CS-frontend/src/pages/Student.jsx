import { useEffect, useState } from "react"
import { BASE_URL } from "../utils/utils";
import { Link } from "react-router-dom";
import NavBar from "../assets/NavBar";
import Footer from "../assets/Footer";

export default function Student() {
    const [student, setStudent] = useState([]);
    const [loading, setLoading] = useState(true)

    async function fetchStudent() {
        setLoading(true)
        const res = await fetch(`/gallery/SPES-Students.json`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        const data = await res.json();
        setStudent(data)
        setLoading(false)
        console.log(data)
    }

    useEffect(() => {
        fetchStudent()
    }, [])

    useEffect(() => {
        if (loading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        if (entry.target.style.animationPlayState) {
                            entry.target.style.animationPlayState = 'running';
                        }
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        const animatedElements = document.querySelectorAll(
            '.animate-pop, .animate-slide-up, .animate-card'
        );

        animatedElements.forEach(el => {
            el.style.opacity = 0;
            observer.observe(el);
        });

        return () => {
            animatedElements.forEach(el => observer.unobserve(el));
        };
    }, [loading, student]);

    return (
        <>
            <NavBar></NavBar>
            <div className={`StudentContent ${loading ? "loading" : ""}`}>
                <div className="StudentWrappers">
                    <div className="Explain">
                        <h1 className="animate-pop">Our Awesome Members!</h1>
                        <p className="animate-slide-up">Meet the talented individuals of RPL58 class! Cool looks, brilliant minds 🥶✨</p>
                    </div>
                    <div className="student">
                        {student.map((item, i) => (
                            <Link
                                key={i}
                                to={`/students/${item.id}`}
                                className="animate-card"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <div className="StudentCard">
                                    <div className="StudentProfile">
                                        <img src={item.profile_url} alt={item.name} />
                                        <div className="profile-overlay"></div>
                                    </div>
                                    <div className="StudentDetail">
                                        <div className="names">
                                            <p>{item.name}</p>
                                            <p className="position-tag">{item.skill}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}