
import { guarantee, shipping, support, trophy } from '../../../../components/icons/services'

const Services = () => {
    return (
        <div className="box_services">
            <div className="container">
                <div className="services-block">
                    <div className="services_sup">
                        <div className="services_icon">
                            <img src={trophy} alt="" />
                        </div>
                        <div className="support_text">
                            <h1 className="services_text_heading">High Quality</h1>
                            <p className="services_text_desc">crafted from top materials</p>
                        </div>
                    </div>
                    <div className="services_sup">
                        <div className="services_icon">
                            <img src={guarantee} alt="" />
                        </div>
                        <div className="support_text">
                            <h1 className="services_text_heading">Warranty Protection</h1>
                            <p className="services_text_desc">Over 2 years</p>
                        </div>
                    </div>
                    <div className="services_sup">
                        <div className="services_icon">
                            <img src={shipping} alt="" />
                        </div>
                        <div className="support_text">
                            <h1 className="services_text_heading">Free Shipping</h1>
                            <p className="services_text_desc">Order over 150 $</p>
                        </div>
                    </div>
                    <div className="services_sup">
                        <div className="services_icon">
                            <img src={support} alt="" />
                        </div>
                        <div className="services_text">
                            <h1 className="services_text_heading"> 24 / 7 Support</h1>
                            <p className="services_text_desc">Dedicated support</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services