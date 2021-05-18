import { useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import api from '../../services/api';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { FoodData } from '../../types';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';

interface DashboardProps extends RouteComponentProps<any> {

}

export function Dashboard(props: DashboardProps){

  // estados
  const [ foods, setFoods ] = useState<FoodData[]>([]);
  const [ editingFood, setEditingFood ] = useState({} as FoodData);
  const [ modalOpen,  setModalOpen ] = useState(false);
  const [ editModalOpen, setEditModalOpen ] = useState(false);

  useEffect(() => {

    api.get(`/foods`)
    .then(({data}) => setFoods(data));

  }, []);

  async function handleAddFood(food: FoodData){

    try {

      // cadastra
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      // adiciona ao array
      setFoods([...foods, response.data]);

    } catch (err) {
      // erro
      console.log(err);
    }
  }

  async function handleUpdateFood(food: FoodData){

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);

    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number){

    // deleta
    await api.delete(`/foods/${id}`);

    // remove a comida deletada
    const foodsFiltered = foods.filter(food => food.id !== id);

    // atualiza o estado
    setFoods(foodsFiltered);
  }

  function toggleModal(){

    setModalOpen(!modalOpen);
  }

  function toggleEditModal(){

    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: FoodData){

    // define a comida sendo editada
    setEditingFood(food);

    // abre o modal
    setEditModalOpen(true);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}