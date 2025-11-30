import React, { useState } from 'react';

export default function AdminAddProductPage() {
    const [ProductID, setProductID] = useState("");
        const[name,setName]=useState("");
        const[altNames,setAltNames]=useState([]);
        const[description,setDescription]=useState("");
        const[price,setPrice]=useState(0);  
        const[labelledPrice,setLabelledPrice]=useState(0);
        const[modelNumber,setModelNumber]=useState("standard");
        const[images,setImages]=useState([]);
        const[category,setCategory]=useState("");
        const[brand,setBrand]=useState("Generic");
        const[stock,setStock]=useState(0);  
        const[isAvailable,setIsAvailable]=useState(true);

    return (
        <div className="w-full h-full flex flex-col items-center p-[50px] overflow-y-scroll">
            <div className="w-[600px] bg-black/80 rounded-2xl p-[40px]">
                <div className="w-full bg-white p-[20px] rounded-2xl ">
                  
                    <div className="my-[10px]">
                        <label className="text-black font-bold">Product ID</label>
                        <input type="text" className="w-full border-[2px] mt-[10px] p-[10px] focus:outline none focus:ring-2 focus:ring-black rounded-2xl px-[20px] " value={ProductID} onChange={(e)=>setProductID(e.target.value)} />
                        <p className="text-gray-500 w-full  text-right text-sm">Unique identifier for the product</p>
                    </div>
                    <div className="my-[10px]">
                        <label className="text-black font-bold">Product Name</label>
                        <input type="text" className="w-full border-[2px] mt-[10px] mb-[20px] p-[10px] focus:outline none focus:ring-2 focus:ring-black rounded-2xl px-[20px] " value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className="my-[10px]"  >
                        <label className="text-black font-bold">Altenative Names</label>
                        <input type="text" className="w-full border-[2px] mt-[10px]  p-[10px] focus:outline none focus:ring-2 focus:ring-black rounded-2xl px-[20px] " value={altNames} onChange={(e)=>setAltNames(e.target.value)} />
                        <p className="text-gray-500 w-full  text-right text-sm">Separate names with commas</p>
                    </div>
                    <div className="my-[10px]"  >
                        <label className="text-black font-bold">Description</label>
                        <textarea type="text" className="w-full border-[2px] mt-[10px]  p-[10px] focus:outline none focus:ring-2 focus:ring-black rounded-2xl px-[20px] " value={description} onChange={(e)=>setDescription(e.target.value)} />
                    </div>
                    <div className="my-[10px]"  >
                        <label className="text-black font-bold">Price</label>
                        <input type="number" className="w-full border-[2px] mt-[10px]  p-[10px] focus:outline none focus:ring-2 focus:ring-black rounded-2xl px-[20px] " value={price} onChange={(e)=>setPrice(e.target.value)} />
                    </div>
                    <div className="my-[10px]"  >
                        <label className="text-black font-bold">Label Price</label>
                        <input type="number" className="w-full border-[2px] mt-[10px]  p-[10px] focus:outline none focus:ring-2 focus:ring-black rounded-2xl px-[20px] " value={labelledPrice} onChange={(e)=>setLabelledPrice(e.target.value)} />
                    </div>
                    <div className="my-[10px]"  >
                        <label className="text-black font-bold">Model Number</label>
                        <input type="text" className="w-full border-[2px] mt-[10px]  p-[10px] focus:outline none focus:ring-2 focus:ring-black rounded-2xl px-[20px] " value={modelNumber} onChange={(e)=>setModelNumber(e.target.value)} />
                    </div>
                    <div className="my-[10px]"  >
                        <label className="text-black font-bold">Images</label>
                        <input type="text" className="w-full border-[2px] mt-[10px]  p-[10px] focus:outline none focus:ring-2 focus:ring-black rounded-2xl px-[20px] " value={images} onChange={(e)=>setImages(e.target.value)} />
                    </div>
                    <div className="my-[10px]"  >
                        <label className="text-black font-bold">Categories</label>
                        <select className="w-full border-[2px] mt-[10px]  p-[10px] focus:outline none focus:ring-2 focus:ring-black rounded-2xl px-[20px] " value={category} onChange={(e)=>setCategory(e.target.value)} >
                            <option value="">Select Category</option>
                            <option value="cpu">CPU</option>
                            <option value="gpu">GPU</option>
                            <option value="motherboard">Motherboard</option>
                            <option value="ram">RAM</option>
                            <option value="storage">Storage</option>
                            <option value="psu">Power Supply Unit</option>
                            <option value="case">Case</option>
                            <option value="cooling">Cooling</option>
                            <option value="accessories">Accessories</option>
                        </select>
                 
                    </div>
                    <div className="my-[10px]"  >
                        <label className="text-black font-bold">Brand</label>
                        <input type="text" className="w-full border-[2px] mt-[10px]  p-[10px] focus:outline none focus:ring-2 focus:ring-black rounded-2xl px-[20px] " value={brand} onChange={(e)=>setBrand(e.target.value)} />
                        <p className="text-gray-500 w-full  text-right text-sm">Separate names with commas</p>
                    </div>
                    <div className="my-[10px]"  >
                        <label className="text-black font-bold">Stock</label>
                        <input type="number" className="w-full border-[2px] mt-[10px]  p-[10px] focus:outline none focus:ring-2 focus:ring-black rounded-2xl px-[20px] " value={stock} onChange={(e)=>setStock(e.target.value)} />
                    </div>
                    <div className="my-[10px]"  >
                        <label className="text-black font-bold">Availability</label>
                        <select className="w-full border-[2px] mt-[10px]  p-[10px] focus:outline none focus:ring-2 focus:ring-black rounded-2xl px-[20px] " value={isAvailable} onChange={(e)=>setIsAvailable(e.target.value)} >
                            <option value={true}>Available</option>
                            <option value={false}>Not Available</option>
                        </select>
                    </div>
                    <button className="w-full bg-accent text-white font-bold p-[15px] rounded-2xl mt-[20px] hover:bg-white hover:text-accent transition-colors duration-300">Add Product</button>
                </div>
                
                   
               

            </div>
        </div>    
);
}