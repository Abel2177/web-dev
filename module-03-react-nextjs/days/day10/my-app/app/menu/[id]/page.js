import {foodData} from '../../data/food';
export default async function Home({params}) {
    const {id} = await params;

    const foodItem = foodData.find((food) => food.id === parseInt(id));

    if (!foodItem) {
        return <p>Food item not found.</p>;
    }
    return (
        <main>
            <h1>{foodItem.name}</h1>
            <p>{foodItem.description}</p>
            <p>Price: ${foodItem.price}</p>
        </main>
    );
}
