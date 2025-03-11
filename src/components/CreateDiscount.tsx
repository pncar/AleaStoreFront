import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from 'react-hook-form';
import {faker} from "@faker-js/faker";
import _ from "lodash";
const CreateDiscount = (props: {onDiscountCreated: () => void}) => {
    const { onDiscountCreated } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const genDate = () => {
        const n = new Date;
        return n.toLocaleDateString();
    }

    const submitDiscount = (data:any) => {
        const {name,rate} = data;
        axios.post(`http://localhost:3000/discounts/create`,{rate: rate, name: name},{withCredentials: true})
        .then((response)=>{
            return response.data
        })
        .then((data)=>{
            console.log(data);
            onDiscountCreated();
        })
        .catch((error)=>{
            console.error(`Error creating discount ->`,error);
        })
    }

    return(
        <div className="p-4 bg-white rounded-md border border-primary-300 shadow-lg flex flex-col space-y-2">
            <p>Add Discount</p>
            <form onSubmit={handleSubmit(submitDiscount)} className="space-y-2">
                <div className="flex space-x-2 justify-around w-full lg:w-1/3 items-center">
                    <label className="w-full">Name</label>
                    <input {...register('name')} type="text" className="w-full std-input" defaultValue={_.capitalize(faker.lorem.word())}/>
                </div>
                <div className="flex space-x-2 justify-around w-full lg:w-1/3 items-center">
                    <label className="w-full">Rate</label>
                    <input {...register('rate')} type="number" className="w-full std-input" min={1} max={99} defaultValue={20}/>
                </div>
                <div className="flex space-x-2 justify-around w-full lg:w-1/3 items-center">
                    <label className="w-full"> Date Start</label>
                    <input className="w-full std-input" type="date"/>
                </div>
                <div className="flex space-x-2 justify-around w-full lg:w-1/3 items-center">
                    <label className="w-full"> Date End</label>
                    <input className="w-full std-input" type="date"/>
                </div>
                <button type="submit" className="std-button bg-sky-600">Create</button>
            </form>
        </div>
    )
}

export default CreateDiscount;