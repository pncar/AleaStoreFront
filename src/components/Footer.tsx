import { faker } from "@faker-js/faker";
import _ from "lodash";
import api from "@/api/api.ts";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import { FaWhatsapp, FaFacebook, FaYoutube, FaTiktok, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GlobalContext } from "@/context/GlobalContext";

const Footer = () => {

    const { storeInfo } = useContext(GlobalContext);

    const [categories,setCategories] = useState<CategoryType[]>([]);

    const genRandom = () => {
        let r:string[] = [];
        for(let i=0;i<3+Math.round(Math.random()*10);i++){
            r.push(_.capitalize(faker.lorem.word()));
        }
        return r;
    }

    const fetchCategories = () => {
        api.get(`/categories`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setCategories(data);
        })
        .catch((error)=>{
            console.error(error);
        });
    }

    useEffect(()=>{
        fetchCategories();
    },[]);

    return(
        <div className="bg-primary-950 min-h-100 text-primary-50 p-6 md:p-16">
            <div className="container w-full xl:w-2/3 m-auto grid xl:grid-cols-4 gap-y-4">
                <div className="space-y-4">
                    <img className="bg-white rounded-lg w-32" src={`https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg`}/>
                </div>
                <div className="space-y-4">
                    <h3 className="font-semibold">Categories</h3>
                    <ul className="space-y-2 text-primary-500">
                        {categories.slice(0,8).map((category:CategoryType,key:number)=><li key={key}><a href={`/products/category/${category.id}`}>{category.name}</a></li>)}
                    </ul>
                    <Link to="/products" className="font-bold text-xs">View All</Link>
                </div>
                <div className="space-y-4">
                    <ul className="space-y-2 text-primary-500">
                        <li><Link to="/faq" className="p-2 px-4 bg-sky-600 rounded-md inline-block text-primary-50 text-sm font-semibold">FAQ</Link></li>
                        <li><Link to="/terms_and_conditions">Terms & Conditions</Link></li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h4 className="font-semibold text-sky-600">Follow our Social Media</h4>
                    <p>{storeInfo?.store_name}</p>
                    <ul className="space-x-2 md:space-y-4 text-primary-400 font-light flex md:flex-col">
                        <li className="flex space-x-2 items-center cursor-pointer hover:text-primary-50 transition-all"><FaWhatsapp className="text-lg"/><span className="text-xs hidden md:inline-block">+54 11 6524 2364</span></li>
                        <li className="flex space-x-2 items-center cursor-pointer hover:text-primary-50 transition-all"><FaFacebook className="text-lg"/><span className="text-xs hidden md:inline-block">/{storeInfo?.store_slug}</span></li>
                        <li className="flex space-x-2 items-center cursor-pointer hover:text-primary-50 transition-all"><FaXTwitter className="text-lg"/><span className="text-xs hidden md:inline-block">@{storeInfo?.store_slug}</span></li>
                        <li className="flex space-x-2 items-center cursor-pointer hover:text-primary-50 transition-all"><FaYoutube className="text-lg"/><span className="text-xs hidden md:inline-block">/{storeInfo?.store_slug}</span></li>
                        <li className="flex space-x-2 items-center cursor-pointer hover:text-primary-50 transition-all"><FaTiktok className="text-lg"/><span className="text-xs hidden md:inline-block">/{storeInfo?.store_slug}</span></li>
                        <li className="flex space-x-2 items-center cursor-pointer hover:text-primary-50 transition-all"><FaLinkedin className="text-lg"/><span className="text-xs hidden md:inline-block">/{storeInfo?.store_slug}</span></li>
                    </ul>
                </div>
            </div>
            <div className="container w-full xl:w-2/3 m-auto flex items-center py-6 space-x-4 justify-center">
                <div className="">
                    <span className="font-semibold text-xl text-sky-500">{storeInfo?.store_name}</span>
                </div>
                <div className="">
                    <p className="text-xs text-primary-300">© 2025 {storeInfo?.store_name}, LLC.</p>
                </div>
            </div>
        </div>
    )
}
export default Footer;