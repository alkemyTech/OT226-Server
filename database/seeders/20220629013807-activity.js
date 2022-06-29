'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const activities = [ 
      {
        name: 'Programas Educativos',
        content: 'Nunc fringilla placerat laoreet. Ut tincidunt vestibulum eros, eget eleifend ipsum ullamcorper id. Donec ut nunc in eros tincidunt finibus. Quisque non venenatis nisl, ut imperdiet libero. Mauris et mauris libero. Nullam eros neque, accumsan vitae blandit at, scelerisque sit amet nisl. Donec laoreet quam et sodales venenatis.',
        image: 'img.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        name: 'Apoyo Escolar para Nivel Primario',
        content: 'Nunc fringilla placerat laoreet. Ut tincidunt vestibulum eros, eget eleifend ipsum ullamcorper id. Donec ut nunc in eros tincidunt finibus. Quisque non venenatis nisl, ut imperdiet libero. Mauris et mauris libero. Nullam eros neque, accumsan vitae blandit at, scelerisque sit amet nisl. Donec laoreet quam et sodales venenatis.',
        image: 'img.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        name: 'Apoyo Escolar para Nivel Secundaria',
        content: 'Nunc fringilla placerat laoreet. Ut tincidunt vestibulum eros, eget eleifend ipsum ullamcorper id. Donec ut nunc in eros tincidunt finibus. Quisque non venenatis nisl, ut imperdiet libero. Mauris et mauris libero. Nullam eros neque, accumsan vitae blandit at, scelerisque sit amet nisl. Donec laoreet quam et sodales venenatis.',
        image: 'img.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        name: 'Tutorias',
        content: 'Nunc fringilla placerat laoreet. Ut tincidunt vestibulum eros, eget eleifend ipsum ullamcorper id. Donec ut nunc in eros tincidunt finibus. Quisque non venenatis nisl, ut imperdiet libero. Mauris et mauris libero. Nullam eros neque, accumsan vitae blandit at, scelerisque sit amet nisl. Donec laoreet quam et sodales venenatis.',
        image: 'img.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        name: 'Encuentro semanal con tutores',
        content: 'Nunc fringilla placerat laoreet. Ut tincidunt vestibulum eros, eget eleifend ipsum ullamcorper id. Donec ut nunc in eros tincidunt finibus. Quisque non venenatis nisl, ut imperdiet libero. Mauris et mauris libero. Nullam eros neque, accumsan vitae blandit at, scelerisque sit amet nisl. Donec laoreet quam et sodales venenatis.',
        image: 'img.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        name: 'Ayudantías',
        content: 'Nunc fringilla placerat laoreet. Ut tincidunt vestibulum eros, eget eleifend ipsum ullamcorper id. Donec ut nunc in eros tincidunt finibus. Quisque non venenatis nisl, ut imperdiet libero. Mauris et mauris libero. Nullam eros neque, accumsan vitae blandit at, scelerisque sit amet nisl. Donec laoreet quam et sodales venenatis.',
        image: 'img.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        name: 'Acompañamiento familiar y escolar',
        content: 'Nunc fringilla placerat laoreet. Ut tincidunt vestibulum eros, eget eleifend ipsum ullamcorper id. Donec ut nunc in eros tincidunt finibus. Quisque non venenatis nisl, ut imperdiet libero. Mauris et mauris libero. Nullam eros neque, accumsan vitae blandit at, scelerisque sit amet nisl. Donec laoreet quam et sodales venenatis.',
        image: 'img.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        name: 'Taller de arte y Cuentos',
        content: 'Nunc fringilla placerat laoreet. Ut tincidunt vestibulum eros, eget eleifend ipsum ullamcorper id. Donec ut nunc in eros tincidunt finibus. Quisque non venenatis nisl, ut imperdiet libero. Mauris et mauris libero. Nullam eros neque, accumsan vitae blandit at, scelerisque sit amet nisl. Donec laoreet quam et sodales venenatis.',
        image: 'img.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        name: 'Procesos educativos y recreativos',
        content: 'Nunc fringilla placerat laoreet. Ut tincidunt vestibulum eros, eget eleifend ipsum ullamcorper id. Donec ut nunc in eros tincidunt finibus. Quisque non venenatis nisl, ut imperdiet libero. Mauris et mauris libero. Nullam eros neque, accumsan vitae blandit at, scelerisque sit amet nisl. Donec laoreet quam et sodales venenatis.',
        image: 'img.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        name: 'Recaudar fondos',
        content: 'Nunc fringilla placerat laoreet. Ut tincidunt vestibulum eros, eget eleifend ipsum ullamcorper id. Donec ut nunc in eros tincidunt finibus. Quisque non venenatis nisl, ut imperdiet libero. Mauris et mauris libero. Nullam eros neque, accumsan vitae blandit at, scelerisque sit amet nisl. Donec laoreet quam et sodales venenatis.',
        image: 'img.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
    ]
    return queryInterface.bulkInsert('Activities', activities, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Activities', null, {});
  }
};
