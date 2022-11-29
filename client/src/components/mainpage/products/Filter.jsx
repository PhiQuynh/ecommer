import {useContext} from 'react'
import { GobalState } from '../../../GobalState';

const Filter = () => {
    const state = useContext(GobalState);
    const [categories] = state.CategoryApi.categories;
    const [category,setCategory] = state.ProductsApi.category;
    const [search,setSearch] = state.ProductsApi.search;
    const [sort,setSort] = state.ProductsApi.sort;
    const filterCategory = (e) =>{
        setCategory(e.target.value);
    };
  return (
    <div className="filter">
        <div className="row">
            <select name="category" value={category} onChange={filterCategory} >
                {categories.map((category) =>( 
                <option value={"categories=" + category._id} key={category._id} >{category.name}</option>
            ))}
            </select>
        </div>

        {/* search */}
        <input type="text" value={search} placehoder="Enter Search" 
        onChange={(e) => setSearch(e.target.value.toLowerCase()) }/>
        <div className="row sort">
                <select value={sort} onChange={(e) => setSort(e.target.value) } >
                    <option value="">Mới nhất</option>
                    <option value="sort=oldest">Cũ nhất</option>
                    <option value="sort=-sold">Số lượng giảm dần</option>
                    <option value="sort=-price">Giá giảm dần</option>
                    <option value="sort=price">Giá tăng dần</option>
                </select>
        </div>
    </div>
  )
}

export default Filter