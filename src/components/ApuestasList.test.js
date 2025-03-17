import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ApuestasList from './ApuestasList';

// Mock de la función fetch
const mockResponse={
      apuestas: [
        {
            fecha: "2023-11-11",
            jornada: 13,
            partidos: [
              {"local": "Real Madrid", "visitante": "Valencia", "apuestas": {"1": 60, "X": 25, "2": 15}},
            ]
        },
      ],
    };

describe('ApuestasList Component', () => {
    beforeEach(() => {
      // Limpiar mocks antes de cada prueba
      
        jest.spyOn(global, 'fetch').mockResolvedValue({
          json: jest.fn().mockResolvedValue(mockResponse)
        })
   
      
    });

test('debería cargar las apuestas correctamente', async () => {
    render(<ApuestasList />);

    // Verificar que se muestra el título
    expect(screen.getByText('Apuestas Realizadas')).toBeInTheDocument();

    // Esperar a que se carguen las apuestas
    await waitFor(() => {
      expect(screen.getByText('Jornada :2023-11-11')).toBeInTheDocument();
      expect(screen.getByText('Real Madrid vs Valencia')).toBeInTheDocument();
      expect(screen.getByText('1: 60 -X: 25 - 2:15')).toBeInTheDocument();
    });
  });




  
   

  test('debería mostrar/ocultar el formulario de nueva apuesta al hacer clic en el botón', async () => {
    render(<ApuestasList />);

    // Verificar que se muestra el título
    expect(screen.getByText('Apuestas Realizadas')).toBeInTheDocument();
    // Esperar a que se carguen las apuestas
    await waitFor(() => {
      expect(screen.getByText('Jornada :2023-11-11')).toBeInTheDocument();
    });

    // Verificar que el formulario no está visible inicialmente
    expect(screen.queryByTestId('nueva-apuesta-form')).not.toBeInTheDocument();

    // Hacer clic en el botón "Nueva apuesta"
    fireEvent.click(screen.getByText('Nueva apuesta'));

    // Verificar que el formulario está visible
    const mensajenuevaapuesta = await screen.findByText(/Formulario Nueva Apuesta -/i);
    expect(mensajenuevaapuesta).toBeInTheDocument();

   
  }); 

  afterEach(() => {
    jest.restoreAllMocks();
  });
});