import { Link } from "react-router-dom"


const Description = () => {
    return (
        <section className="description">
            <div className="container">
                <div className="description-heading">
                    <p className="description-heading__title"><Link to={""} className="description-heading__link">Description</Link>
                    </p>
                    <p className="description-heading__title"><Link to={""} className="description-heading__link">Additional
                        Information</Link></p>
                    <p className="description-heading__title"><Link to={""} className="description-heading__link">Reviews [5]</Link></p>
                </div>
                <div className="description-text">
                    <div className="description-text__desc">Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn
                        portable
                        active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and
                        takes
                        the show on the road.</div>
                    <div className="description-text__desc">Weighing in under 7 pounds, the Kilburn is a lightweight piece of
                        vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn
                        is
                        a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended
                        highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune
                        the
                        controls to your personal preferences while the guitar-influenced leather strap enables easy and
                        stylish
                        travel.
                    </div>
                </div>
                <div className="description-img">
                    <img src="https://picsum.photos/id/157/610/350" alt="" />
                    <img src="https://picsum.photos/id/157/610/350" alt="" />
                </div>
            </div>
        </section>

    )
}

export default Description