import knex, { Knex } from 'knex';

export async function seed (knex: Knex) {
     // Deletes ALL existing entries
     return knex('items').del()
     .then(function () {
       // Inserts seed entries
        return knex('items').insert([
         {
           title: 'Lâmpadas',
           image: 'lampadas.svg',         
           
         },
         {
            title: 'Pilhas e Baterias',
            image: 'baterias.svg',         
            
          },
          {
            title: 'Papéis e Papelão',
            image: 'papeis-papelão.svg',         
            
          },
          {
            title: 'Resíduos Eletrônicos',
            image: 'eletronicos.svg',         
            
          }
          ,
          {
            title: 'Resíduos Orgânicos',
            image: 'organicos.svg',         
            
          }
          ,
          {
            title: 'Óleo de Cozinha',
            image: 'oleo.svg',         
            
          }
       ]);
     });
}
   
