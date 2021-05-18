import { useRef } from 'react';
import { FormHandles } from '@unform/core';
import { FiCheckSquare, FiLink, FiTag } from 'react-icons/fi';
import { FaDollarSign } from 'react-icons/fa';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

import { FoodData } from './../../types';

interface ModalAddFoodProps{
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: FoodData) => void;
}

export function ModalAddFood({
  isOpen,
  setIsOpen,
  handleAddFood
}: ModalAddFoodProps){

  const formRef = useRef<FormHandles>(null);

  async function handleSubmit(data: FoodData){

    handleAddFood(data);
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
      >
        <h1>Novo Prato</h1>
        <Input name="image" icon={FiLink} placeholder="Cole o link aqui" />

        <Input name="name" icon={FiTag} placeholder="Ex: Moda Italiana" />
        <Input name="price" icon={FaDollarSign} placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}