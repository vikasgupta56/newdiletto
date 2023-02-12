import React, { useState } from 'react'
import Admin from '../Admin'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoArrowBackSharp } from 'react-icons/io5'
import { doc, db, getDoc, collection, getDocs, setDoc, updateDoc, addDoc } from '../../firebase'
import { Router, useRouter } from 'next/router'




const Category = ({ categories }) => {
    const router = useRouter()
    // console.log(categories, "yo");
    const [selected, setSelected] = useState(null)
    const [subList, setSubList] = useState([]);
    const [newCategory, setNewCategory] = useState("")

    let func = async (category) => {

        setSelected(category)
        let categoriesName = doc(db, 'cakesCategories', category)
        let names = await getDoc(categoriesName);
        console.log(names, "names");
        let subcollections = names.data().subcollections;
        setSubList(subcollections);
    }

    let addNewCategory = async () => {
        // console.log(newCategory);
        await setDoc(doc(doc(db, "cakesCategories", selected), newCategory, newCategory), { pointers: [] });
        subList.push(newCategory);
        await updateDoc(doc(db, "cakesCategories", selected), {
            subcollections: subList
        });
        alert("added")

    }

    return (
        <Admin>
            <div className="products">
                <div className="products-title">Categories</div>
                <div className="products-outer-div">
                    <div className="products-cont ">
                        <div className="top-div">
                            <div className="top-coll br0">
                                {selected != null && <div className="back-arrow t3 flex-all" onClick={() => { setSelected(null) }} ><IoArrowBackSharp /></div>}
                                All Collection</div>
                        </div>
                        <div className="cat-cont t3">
                            <div className="cat-cont-inner t3" style={{ transform: `translateX(${selected != null ? -100 : 0}%)` }}>
                                <div className="cat-left t3">
                                    <div className="add-category">
                                        <div className="add-plus-cont add-coll t3">
                                            <div className="add-plus flex-all"><AiOutlinePlus /></div>
                                            Add new Category
                                        </div>
                                    </div>
                                    {categories.map((category, index) => {
                                        return (
                                            <div className='category t3' onClick={() => { func(category); }} key={index}>{category}</div>
                                        )
                                    })}
                                </div>
                                <div className="cat-right">
                                    <div className="add-category" >
                                        <div className="add-plus-cont add-coll t3">
                                            <div className="add-plus flex-all"><AiOutlinePlus /></div>
                                            Add new Category
                                        </div>
                                    </div>
                                    <div className="category t3">
                                        <div className="add-plus-cont add-coll t3">
                                            <div className="add-plus flex-all"><AiOutlinePlus /></div>
                                            Add new Category
                                        </div>
                                        <input type="text" value={newCategory} onChange={(e) => { setNewCategory(e.target.value) }} className='col-inp' />
                                        <button onClick={addNewCategory}>Add</button>
                                    </div>
                                    {subList.map((list, index) => {
                                        return (
                                            <div key={index} className="category t3" onClick={() => { router.push(`/admin/categories/${selected}-${list}`) }}>{list}</div>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Admin>
    )
}

export default Category



