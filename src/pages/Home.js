import Banner from "../components/Banner";
import FeaturedProducts from "../components/FeaturedProducts";

export default function Home() {

    return(
        <>  
            <Banner />
            <h1 className='mt-3'>Welcome to <strong className="head-name">Haze</strong>!</h1>
            <p>Haze includes a digital storefront called the Haze Store through which users can purchase games and game merchandise.</p>
            <FeaturedProducts />
        </>
    )
}
 