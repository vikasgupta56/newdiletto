import CakesByTypes from '../CakesByTypes';

import BlueberryFlavour from '../../../public/navbar/cakesByFlavour/blueberry min/vanilla blueberry cake min.webp';
import GlazeBlueberry from '../../../public/navbar/cakesByFlavour/blueberry min/glaze blueberry cake.webp';
import BlueberryCake from '../../../public/navbar/cakesByFlavour/blueberry min/blueberry cake.webp'
import PurpleBluberry from '../../../public/navbar/cakesByFlavour/blueberry min/purple blueberry.webp'

import BlackForestCake from '../../../public/navbar/cakesByFlavour/chocolate min/black forest cake.webp';
import OreoChocolate from '../../../public/navbar/cakesByFlavour/chocolate min/oreo chocolate cake.webp';
import Cadchoc from '../../../public/navbar/cakesByFlavour/chocolate min/cadbury chocolate cake.webp';
import Chocover from '../../../public/navbar/cakesByFlavour/chocolate min/chocolate overwhelming.webp';

import Softpineapple from '../../../public/navbar/cakesByFlavour/pineapple/soft pineapple cake.jpg';
import Vanillapineapple from '../../../public/navbar/cakesByFlavour/pineapple/vanilla pineapple cake.jpg';
import ExoticPineapple from '../../../public/navbar/cakesByFlavour/pineapple/exotic pineapple cake.jpg';
import PineappleCake from '../../../public/navbar/cakesByFlavour/pineapple/pineapple cake.jpg';

import RasmalaiCake from '../../../public/navbar/cakesByFlavour/rasmalai/rasmalai cake.jpg';
import DeliciousRasmalai from '../../../public/navbar/cakesByFlavour/rasmalai/delicious rasmalai cake.jpg';
import BirthdayRasmalai from '../../../public/navbar/cakesByFlavour/rasmalai/birthday rasmalai cake.jpg';
import PremiumRasmalai from '../../../public/navbar/cakesByFlavour/rasmalai/premium rasmalai cake.jpg';

import ButterscotchCake from '../../../public/navbar/cakesByFlavour/butterscotch/butterscotch cake.jpg';
import OverwhelmingButterscotch from '../../../public/navbar/cakesByFlavour/butterscotch/overwhelming butterscotch cake.jpg';
import TastyButterscotch from '../../../public/navbar/cakesByFlavour/butterscotch/tasty butterscotch cake.jpg';
import NutsButterscotch from '../../../public/navbar/cakesByFlavour/butterscotch/nuts butterscotch cake.jpg';

import StrawberryCake from '../../../public/navbar/cakesByFlavour/strawberry/strawberry cake.jpg';
import ExoticStrawberry from '../../../public/navbar/cakesByFlavour/strawberry/strawberry exotic cake.jpg';
import AtlasStrawberry from '../../../public/navbar/cakesByFlavour/strawberry/strawberry atlas cake.jpeg';
import SpecialStrawberry from '../../../public/navbar/cakesByFlavour/strawberry/strawberry special cake.jpg';

import MixedFruitCake from '../../../public/navbar/cakesByFlavour/Mixed Fruit/mixed fruit cake.jpg';
import SeasonalMixedFruitCake from '../../../public/navbar/cakesByFlavour/Mixed Fruit/Seasonal fruits mixed fruit cake.jpg';
import DeliciousMixedFruitCake from '../../../public/navbar/cakesByFlavour/Mixed Fruit/Delicious mixed fruit cake.jpg';
import FruitCake from "../../../public/navbar/cakesByFlavour/Mixed Fruit/fruit cake.jpg";

import RedVelvetCake from "../../../public/navbar/cakesByFlavour/red velvet/red velvet cake.jpg";
import CheeseVelvetCake from "../../../public/navbar/cakesByFlavour/red velvet/Cheese cake.jpg";
import AmazingRedVelvetCake from "../../../public/navbar/cakesByFlavour/red velvet/Red velvet cheese cake.jpg";
import RedicilousVelvetCake from "../../../public/navbar/cakesByFlavour/red velvet/redicilous velvet cake.jpg";

const CakesByFlavour = () => {

    const cakesByFlavour = [
        {
            name: "Blueberry cake",
            link: "/Cakes By Flavour-Blueberry Cakes",
            cakes: [
                {
                    name: "Blueberry cake",
                    imgsrc: BlueberryFlavour,
                    price: "350"
                },
                {
                    name: "Blueberry cake",
                    imgsrc: GlazeBlueberry,
                    price: "350"
                },
                {
                    name: "Blueberry cake",
                    imgsrc: BlueberryCake,
                    price: "350"
                },
                {
                    name: "Blueberry cake",
                    imgsrc: PurpleBluberry,
                    price: "350"
                },

            ]
        },
        {
            name: "Chocolate cakes",
            link: "/Cakes By Flavour-Chocolate Cakes",
            cakes: [
                {
                    name: "Black Forest cake",
                    imgsrc: BlackForestCake,
                    price: "350"
                },

                {
                    name: "Oreo chocolate cake",
                    imgsrc: OreoChocolate,
                    price: "350"
                },

                {
                    name: "Black Forest cake",
                    imgsrc: Cadchoc,
                    price: "350"
                },

                {
                    name: "Black Forest cake",
                    imgsrc: Chocover,
                    price: "350"
                },
            ]
        },

        {
            name: "Pineapple cakes",
            link: "/Cakes By Flavour-Pineapple Cakes",

            cakes: [
                {
                    name: "Soft Pineapple cake",
                    price: "350",
                    imgsrc: Softpineapple
                },
                {
                    name: "Vanilla Pineapple cake",
                    price: "350",
                    imgsrc: Vanillapineapple
                },

                {
                    name: "Exotic pineapple cake",
                    price: "350",
                    imgsrc: ExoticPineapple
                },

                {
                    name: "Pineapple cake",
                    price: "350",
                    imgsrc: PineappleCake
                },

            ]
        },

        {
            name: "Rasmalai cakes",
            link: "/Cakes By Flavour-Rasmalai Cakes",

            cakes: [
                {
                    name: "Rasmalai cake",
                    imgsrc: RasmalaiCake,
                    price: "350"
                },

                {
                    name: "Delicious Rasmalai cake",
                    imgsrc: DeliciousRasmalai,
                    price: "350"
                },

                {
                    name: "Birthday Rasmalai cake",
                    imgsrc: BirthdayRasmalai,
                    price: "350"
                },

                {
                    name: "Premium Rasmalai cake",
                    imgsrc: PremiumRasmalai,
                    price: "350"
                },
            ]
        },

        {
            name: "Butterscotch cakes",
            link: "/Cakes By Flavour-Blueberry Cakes",

            cakes: [
                {
                    name: "Butterscotch cake",
                    imgsrc: ButterscotchCake,
                    price: "350"
                },
                {
                    name: "Overwhelming Butterscotch cake",
                    imgsrc: OverwhelmingButterscotch,
                    price: "350"
                },
                {
                    name: "Butterscotch cake",
                    imgsrc: TastyButterscotch,
                    price: "350"
                },
                {
                    name: "Butterscotch cake",
                    imgsrc: NutsButterscotch,
                    price: "350"
                },
            ]
        },

        {
            name: "Strawberry cakes",
            link: "/Cakes By Flavour-Blueberry Cakes",

            cakes: [
                {
                    name: "Strawberry cake",
                    imgsrc: StrawberryCake,
                    price: "350"
                },
                {
                    name: "Strawberry exotic cake",
                    imgsrc: ExoticStrawberry,
                    price: "350"
                },
                {
                    name: "Strawberry atlas cake",
                    imgsrc: AtlasStrawberry,
                    price: "350"
                },
                {
                    name: "strawberry Special cake",
                    imgsrc: SpecialStrawberry,
                    price: "350"
                },
            ]
        },

        {
            name: "Mixed Fruit cakes",
            link: "/Cakes By Flavour-Blueberry Cakes",

            cakes: [
                {
                    name: "Mixed Fruit cake",
                    imgsrc: MixedFruitCake,
                    price: "350"
                },
                {
                    name: "Seasonal Fruit cake",
                    imgsrc: SeasonalMixedFruitCake,
                    price: "350"
                },
                {
                    name: "Delicious Mixed Fruit cake",
                    imgsrc: DeliciousMixedFruitCake,
                    price: "350"
                },
                {
                    name: "Fruit cake",
                    imgsrc: FruitCake,
                    price: "350"
                },
            ]
        },
        {
            name: "Red velvet cakes",
            link: "/Cakes By Flavour-Blueberry Cakes",

            cakes: [
                {
                    name: "Red Velvet cake",
                    imgsrc: RedVelvetCake,
                    price: "350"
                },
                {
                    name: "Cheese Velvet cake",
                    imgsrc: CheeseVelvetCake,
                    price: "350"
                },
                {
                    name: "Amazing Red Velvet cake",
                    imgsrc: AmazingRedVelvetCake,
                    price: "350"
                },
                {
                    name: "Redicilous Velvet cake",
                    imgsrc: RedicilousVelvetCake,
                    price: "350"
                },
            ]
        }

    ]
    return (
        <CakesByTypes cakesByType={cakesByFlavour} />
    )
}
export default CakesByFlavour