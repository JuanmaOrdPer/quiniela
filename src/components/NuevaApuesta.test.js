import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NuevaApuesta from './NuevaApuesta';

// Mock de los partidos
const mockPartidos = 
     [
        {"local": "Real Madrid", "visitante": "Valencia", "apuestas": {"1": 60, "X": 25, "2": 15}},
        {"local": "Barcelona", "visitante": "Almería", "apuestas": {"1": 70, "X": 18, "2": 12}}
       
      ];

// Mock de las funciones
const mockSetShow = jest.fn();
const mockSetPartidos = jest.fn();

describe('NuevaApuesta Component', () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada prueba
    mockSetShow.mockClear();
    mockSetPartidos.mockClear();
  });

  test('debería renderizar el modal cuando show es true', () => {
    render(
      <NuevaApuesta
        show={true}
        setShow={mockSetShow}
        partidos={mockPartidos}
        jornada="Jornada 1"
        index={0}
        setPartidos={mockSetPartidos}
      />
    );

    // Verificar que el modal está visible
    expect(screen.getByText('Formulario Nueva Apuesta - Jornada 1')).toBeInTheDocument();
    expect(screen.getByText('Real Madrid -Valencia')).toBeInTheDocument();
    expect(screen.getByText('Barcelona -Almería')).toBeInTheDocument();
  });

  test('debería cerrar el modal al hacer clic en el botón Close', () => {
    render(
      <NuevaApuesta
        show={true}
        setShow={mockSetShow}
        partidos={mockPartidos}
        jornada="Jornada 1"
        index={0}
        setPartidos={mockSetPartidos}
      />
    );

    // Hacer clic en el botón Close
    fireEvent.click(screen.getByText('Close'));
    expect(mockSetShow).toHaveBeenCalledWith(0); // Verificar que setShow se llama con el índice correcto
  });

  test('debería actualizar la apuesta al hacer clic en los botones 1, X, 2', () => {
    render(
      <NuevaApuesta
        show={true}
        setShow={mockSetShow}
        partidos={mockPartidos}
        jornada="Jornada 1"
        index={0}
        setPartidos={mockSetPartidos}
      />
    );

    // Hacer clic en el botón "1" del primer partido
    fireEvent.click(screen.getAllByText('1')[0]);
    expect(screen.getAllByText('1')[0]).toHaveClass('selecteButton'); // Verificar que el botón está seleccionado

    // Hacer clic en el botón "X" del segundo partido
    fireEvent.click(screen.getAllByText('X')[1]);
    expect(screen.getAllByText('X')[1]).toHaveClass('selecteButton'); // Verificar que el botón está seleccionado
  });

  //Hacer clic en boton validar 
  describe("NuevaApuesta", () => {
    test("Muestra alerta si no se han realizado todas las apuestas", () => {
      render(
        <NuevaApuesta show={true} setShow={mockSetShow} partidos={mockPartidos} jornada={"Jornada 1"} index={0} setPartidos={mockSetPartidos} />
      );
  
      const validarButton = screen.getByText("Validar");
      fireEvent.click(validarButton);
  
      expect(screen.getByText("Falta por insertar las apuestas")).toBeInTheDocument();
    });
  
    test("Guarda las apuestas y cierra el modal si todas están realizadas", () => {
      render(
        <NuevaApuesta show={true} setShow={mockSetShow} partidos={mockPartidos} jornada={"Jornada 1"} index={0} setPartidos={mockSetPartidos} />
      );
  
      const buttons = screen.getAllByRole("button");
      fireEvent.click(buttons[0]); // Seleccionar resultado para el primer partido
      fireEvent.click(buttons[3]); // Seleccionar resultado para el segundo partido
  
      const validarButton = screen.getByText("Validar");
      fireEvent.click(validarButton);
  
      expect(mockSetPartidos).not.toHaveBeenCalled();
      expect(mockSetShow).toHaveBeenCalledWith(0);
    });
  });
  

});