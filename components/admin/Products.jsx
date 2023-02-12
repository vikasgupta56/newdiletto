import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { uploadBytes,getDocs, collection, doc,col, ref, db, storage, addDoc, uploadString, getDownloadURL } from '../firebase.js'
import { AiOutlinePlus } from 'react-icons/ai'
import {FiEdit2} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import Admin from './Admin'
import swal from 'sweetalert';

const Products = ({ cakes}) => {

    const [products, setProducts] = useState(cakes);
    const [uploads, setUploads] = useState([])
    const [global, setGlobal] = useState({ name: 'Cake', price: 350,cutPrice:500,minKg:0.5 })

    let handleUpload = (e, index) => {
        let name = e.target.name;
        let value = e.target.value;
        const upload = uploads[index];
        upload[name] = value;
        setUploads([
            ...uploads.slice(0, index),
            upload,
            ...uploads.slice(index + 1, uploads.length)
        ]);
    }

    let refreshProducts = async() =>{
        const col = collection(db, 'all-cakes');
        const snapshot = await getDocs(col);
        const newProducts = snapshot.docs.map(doc => doc.data());
        setProducts(newProducts);
    }

    let uploadAll = async() => {
        try{
            await Promise.all(uploads.map(async (upload, index) => {
                const mountainsRef = ref(storage, `all-cakes/${upload.name}`);
                let snapshot = await uploadBytes(mountainsRef, upload.imgsrc);
                let a = await getDownloadURL(snapshot.ref);
                upload.imgsrc = a;
                delete upload.webLink;
                await addDoc(collection(db, 'all-cakes'), upload);
            }))
            swal("Hurray!", "Products saved successfully", "sucess");
            setUploads([])
            refreshProducts();
        }
        catch(e){
            swal("Oops!", "Something went wrong!" + e, "error");
        }
    }

    const selectFiles = (event) => {
        let arr = [];
        for (let i = 0; i < event.target.files.length; i++) {
            arr.push({ imgsrc: event.target.files[i], webLink: URL.createObjectURL(event.target.files[i]), name: global.name, price: global.price,cutPrice:global.cutPrice,minKg:global.minKg });
        }
        setUploads(arr)
    };

    const handleInputs = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setGlobal({ ...global, [name]: value })
    }
    return (
        <>
            <Admin>
                <div className="products">
                    <div className="products-title">Products</div>
                    <div className="products-outer-div">
                        {uploads.length > 0 && <div className="upload-all flex-all t3" onClick={uploadAll}>Save all</div>}
                        <div className="products-cont">
                            <div className="top-div">
                                <div className="top-img br1 tdd">Images</div>
                                <div className="top-name br1 tdd">Name</div>
                                <div className="top-price br1 tdd">Price</div>
                                <div className="top-cutprice br1 tdd">Cut Price</div>
                                <div className="top-minkg br1 tdd">Min kg</div>
                                <div className="top-edit tdd">Edit | Delete</div>
                            </div>
                            <div className="add-product">
                                <div className="global-img-cont br1 flex-all">
                                    <input type="file" accept="image/*" onChange={selectFiles} multiple className='product-inp ' />
                                    <div className="add-plus-cont pos-abs-full t3">
                                        <div className="add-plus flex-all"><AiOutlinePlus /></div>
                                        Add products
                                    </div>
                                    {/* </> */}
                                    {/* } */}
                                </div>
                                <div className="global-name-cont br1 flex-all"><input className='pro-name-inp' onChange={handleInputs} name="name" value={global.name} /></div>
                                <div className="global-price-cont br1 flex-all"><input className='pro-price-inp' onChange={handleInputs} name="price" value={global.price} /></div>
                                <div className="global-cutprice-cont br1 flex-all"><input className='pro-price-inp' onChange={handleInputs} name="cutPrice" value={global.cutPrice} /></div>
                                <div className="global-minkg-cont br1 flex-all"><input className='pro-price-inp' onChange={handleInputs} name="minKg" value={global.minKg} /></div>

                                <div className="product-edit flex-all" ></div>
                            </div>
                            {uploads.map((upload, i) => {
                                return (
                                    <div key={i} className="product">
                                        <div className="product-img-cont br1 flex-all">
                                            <div className="product-img">
                                                <Image src={upload.webLink} fill />
                                            </div>
                                        </div>
                                        <div className="product-name br1 flex-all">
                                            <input className='pro-inp t3' value={upload.name} name="name" onChange={() => { handleUpload(window.event, i) }} placeholder="Product name" />
                                        </div>
                                        <div className="product-price br1 flex-all">
                                            <input className='pro-inp t3' value={upload.price} name="price" onChange={() => { handleUpload(window.event, i) }} placeholder="Product Price" />
                                        </div>
                                        <div className="product-cutprice br1 flex-all">
                                            <input className='pro-inp t3' value={upload.cutPrice} name="cutPrice" onChange={() => { handleUpload(window.event, i) }} placeholder="Product Cut Price" />
                                        </div>
                                        <div className="product-minkg br1 flex-all">
                                            <input className='pro-inp t3' value={upload.minKg} name="minKg" onChange={() => { handleUpload(window.event, i) }} placeholder="Product Min kg" />
                                        </div>
                                        <div className="product-edit flex-all">
                                           
                                        </div>
                                    </div>
                                );
                            })}
                            {uploads.length > 0 && <div className="products-list-cont">
                                All products
                            </div>}
                            {products.map((product, index) => {
                                return (
                                    <div key={index} className="product">
                                        <div className="product-img-cont br1 flex-all">
                                            <div className="product-img">
                                                <Image src={product.imgsrc} fill />
                                            </div>
                                        </div>
                                        <div className="product-name br1 flex-all">{product.name || undefined}</div>
                                        <div className="product-price br1 flex-all">{product.price || undefined}</div>
                                        <div className="product-cutprice br1 flex-all">{product.cutPrice || undefined}</div>
                                        <div className="product-minkg br1 flex-all">{product.minKg || undefined}</div>
                                        <div className="product-edit flex-all">
                                        <div className="edit-div flex-all"><FiEdit2 /></div>
                                            <div className="delete-div flex-all"><RiDeleteBin6Line /></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Admin>

        </>
    )
}

export default Products



  // var width = 1920;
            // var height = 1080;


            // var canvas = document.createElement('canvas');  // Dynamically Create a Canvas Element
            // var img = document.createElement('img');
            // img.src = upload.imgsrc;
            // var w, h;
            // img.onload = function () {
            //     w = img.width;
            //     h = img.height;
            // }
            // canvas.width = 1024;  // Set the width of the Canvas
            // canvas.height = 1024;  // Set the height of the Canvas
            // var ctx = canvas.getContext("2d");  // Get the "context" of the canvas 
            // var img = document.getElementsByClassName('product-img')[index].getElementsByTagName('img')[0];  // The id of your image container
            // ctx.drawImage(img, 0, 0, width, height);  // Draw your image to the canvas


            // var jpegFile = canvas.toDataURL("image/webp");
