import { useParams } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';
import ProductCard from '../../../../src/components/product-card/product-card.component';
import { CategoryContainer, CategoryTitle } from './category.styles';
import Spinner from '../../../../src/components/spinner/spinner.component';

type CategoryRouteParams = {
    category: string;
}


const Category = () => {
    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [ products, setProducts ] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [categoriesMap, category]);

    return(
        <Fragment>
             <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
             {
                isLoading ? (
                    <Spinner />
                ) : (
                    <CategoryContainer>
                        {products && 
                            products.map((product) => (
                                <ProductCard  key={product.id} product={product} />))}
                    </CategoryContainer>
                )
             }
            
        </Fragment>
          
    );
}

export default Category;