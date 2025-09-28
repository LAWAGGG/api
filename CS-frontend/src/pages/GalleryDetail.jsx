import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { BASE_URL } from "../utils/utils"
import "/src/gallery.css"

export default function GalleryDetail() {
    const [gallery, setgallery] = useState({})
    const [desc, setdesc] = useState("")
    const [images, setimages] = useState([])
    const [title, settitle] = useState("")
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const { id } = useParams()

    async function fetchGallery() {
        const res = await fetch("https://lawaggg.github.io/api/v1/SPES-Galery.json");
        const data = await res.json()
        const found = data.find(item => item.id === Number(id))
        setgallery(found)
        console.log(found)
        setdesc(found.description)
        settitle(found.title)

        // Gabung gambar jadi array
        const imageArray = [
            found.image_url_1,
            found.image_url_2,
            found.image_url_3,
        ].filter(img => img) // Filter out null/undefined images

        setimages(imageArray)
    }

    useEffect(() => {
        fetchGallery()
    }, [])

    // Fungsi pindah slide dengan animasi smooth - single image focus
    const prevSlide = () => {
        if (isTransitioning || images.length <= 1) return
        setIsTransitioning(true)
        setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))

        setTimeout(() => {
            setIsTransitioning(false)
        }, 700) // Durasi sesuai CSS transition
    }

    const nextSlide = () => {
        if (isTransitioning || images.length <= 1) return
        setIsTransitioning(true)
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))

        setTimeout(() => {
            setIsTransitioning(false)
        }, 700) // Durasi sesuai CSS transition
    }

    // Fungsi untuk langsung ke slide tertentu (untuk indicator dots)
    const goToSlide = (index) => {
        if (isTransitioning || index === currentSlide || images.length <= 1) return
        setIsTransitioning(true)
        setCurrentSlide(index)

        setTimeout(() => {
            setIsTransitioning(false)
        }, 700)
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") {
                prevSlide()
            }
            if (e.key === "ArrowRight") {
                nextSlide()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [images, isTransitioning])

    // Auto-slide (opsional)
    useEffect(() => {
        const autoSlide = setInterval(() => {
            if (!isTransitioning && images.length > 1) {
                nextSlide()
            }
        }, 5000) // Ganti slide setiap 5 detik

        return () => clearInterval(autoSlide)
    }, [currentSlide, isTransitioning, images.length])

    return (
        <div className="GalleryContentBg">
            <div className="GalleryDetailContent">
                <Link to="/galleries">&larr; Back</Link>
                <div className="DetailGallery">
                    <div className="detailsImage">
                        <h1>{title}</h1>
                        <p>{desc}</p>
                    </div>

                    <div className="ImagesList">
                        <div className="carousel-wrapper">
                            {images.length > 0 && (
                                <>
                                    <div
                                        className={`carousel-container ${isTransitioning ? 'transitioning' : ''}`}
                                        style={{
                                            transform: `translateX(-${currentSlide * 100}%)`
                                        }}
                                    >
                                        {images.map((image, index) => (
                                            <div key={index} className="carousel-slide">
                                                <img
                                                    src={image}
                                                    alt={`Image ${index + 1}`}
                                                    className="loaded"
                                                    onLoad={(e) => e.target.classList.add('loaded')}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Navigation Buttons - hanya tampil jika ada lebih dari 1 gambar */}
                                    {images.length > 1 && (
                                        <>
                                            <button
                                                className="carousel-btn left"
                                                onClick={prevSlide}
                                                disabled={isTransitioning}
                                            >
                                                &#10094;
                                            </button>
                                            <button
                                                className="carousel-btn right"
                                                onClick={nextSlide}
                                                disabled={isTransitioning}
                                            >
                                                &#10095;
                                            </button>

                                            {/* Indicator Dots - hanya tampil jika ada lebih dari 1 gambar */}
                                            <div className="carousel-indicators">
                                                {images.map((_, index) => (
                                                    <div
                                                        key={index}
                                                        className={`indicator-dot ${index === currentSlide ? 'active' : ''}`}
                                                        onClick={() => goToSlide(index)}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}