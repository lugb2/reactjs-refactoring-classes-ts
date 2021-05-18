import { useRef } from 'react';
import { FiCheckSquare, FiLink, FiTag } from 'react-icons/fi';
import { FaDollarSign } from 'react-icons/fa';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { FormHandles } from '@unform/core';
import { FoodData } from '../../types';

interface ModalEditFoodProps{
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFood: (food: FoodData) => void;
  editingFood: FoodData;
}

export function ModalEditFood({
  isOpen,
  setIsOpen,
  handleUpdateFood,
  editingFood
}: ModalEditFoodProps){

  const formRef = useRef<FormHandles>(null);

  async function handleSubmit(data: FoodData){

    handleUpdateFood(data);
    setIsOpen();
  }

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={editingFood}
      >
        <h1>Editar Prato</h1>
        <Input name="image" icon={FiLink} placeholder="Cole o link aqui" />

        <Input name="name" icon={FiTag} placeholder="Ex: Moda Italiana" />
        <Input name="price" icon={FaDollarSign} placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
