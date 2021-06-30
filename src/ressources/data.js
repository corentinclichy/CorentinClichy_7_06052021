const recipes = [
  {
    id: 1,
    name: "Limonade de Coco",
    servings: 1,
    ingredients: [
      {
        ingredient: "Lait de coco",
        quantity: 400,
        unit: "ml",
      },
      {
        ingredient: "Jus de citron",
        quantity: 2,
      },
      {
        ingredient: "Crème de coco",
        quantity: 2,
        unit: "Cuillères à soupe",
      },
      {
        ingredient: "Sucre",
        quantity: 30,
        unit: "gr",
      },
      {
        ingredient: "Glaçons",
      },
    ],
    time: 10,
    description:
      "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistance désirée",
    appliance: "Blender",
    ustensils: ["Cuillère à Soupe", "Verres", "Presse citron"],
  },
  {
    id: 2,
    name: "Poisson Cru à la tahitienne",
    servings: 2,
    ingredients: [
      {
        ingredient: "Thon Rouge (ou blanc)",
        quantity: 200,
        unit: "gr",
      },
      {
        ingredient: "Concombre",
        quantity: 1,
      },
      {
        ingredient: "Tomate",
        quantity: 2,
      },
      {
        ingredient: "Carotte",
        quantity: 1,
      },
      {
        ingredient: "Citron Vert",
        quantity: 5,
      },
      {
        ingredient: "Lait de coco",
        quantity: 100,
        unit: "ml",
      },
    ],
    time: 60,
    description:
      "Découper le thon en dés, mettre dans un plat et recouvrir de jus de citron vert (mieux vaut prendre un plat large et peu profond). Laisser reposer au réfrigérateur au moins 2 heures. (Si possible faites-le le soir pour le lendemain). Après avoir laissé mariner le poisson, couper le concombre en fines rondelles sans la peau et les tomates en prenant soin de retirer les pépins. Râper la carotte. Ajouter les légumes au poisson avec le citron cette fois ci, dans un saladier. Ajouter le lait de coco. Pour ajouter un peu plus de saveur vous pouver ajouter 1 à 2 Cuillères à soupe de crème de coco",
    appliance: "Saladier",
    ustensils: ["Presse citron"],
  },
  {
    id: 3,
    name: "Poulet coco réunionnais",
    servings: 4,
    ingredients: [
      {
        ingredient: "Poulet",
        quantity: 1,
      },
      {
        ingredient: "Lait de coco",
        quantity: 400,
        unit: "ml",
      },
      {
        ingredient: "Coulis de tomates",
        quantity: 25,
        unit: "cl",
      },
      {
        ingredient: "Oignon",
        quantity: 1,
      },
      {
        ingredient: "Poivron rouge",
        quantity: 1,
      },
      {
        ingredient: "Huile d'olive",
      },
    ],
    time: 80,
    description:
      "Découper le poulet en morceaux, les faire dorer dans une cocotte avec de l'huile d'olive. Salez et poivrez. Une fois doré, laisser cuire en ajoutant de l'eau. Au bout de 30 minutes, ajouter le coulis de tomate, le lait de coco ainsi que le poivron et l'oignon découpés en morceaux. Laisser cuire 30 minutes de plus. Servir avec du riz",
    appliance: "Cocotte",
    ustensils: ["Couteau"],
  },
  {
    id: 4,
    name: "Salade de riz",
    servings: 4,
    ingredients: [
      {
        ingredient: "Riz blanc",
        quantity: 500,
        unit: "gr",
      },
      {
        ingredient: "Thon en miettes",
        quantity: 200,
        unit: "gr",
      },
      {
        ingredient: "Tomate",
        quantity: 2,
      },
      {
        ingredient: "Oeufs",
        quantity: 2,
      },
      {
        ingredient: "Maïs",
        quantity: 300,
        unit: "gr",
      },
      {
        ingredient: "Vinaigrette",
        quantity: 5,
        unit: "cl",
      },
    ],
    time: 50,
    description:
      "Faire cuire le riz. Une fois le riz cuit, le laisser refroidir. Couper les oeufs dur en quarts ou en lamelle au choix, coupez le tomates en dés, ajouter au riz les oeufs, les tomates, le poisson, le maïs et la vinaigrette. Ajouter au gout de chacun des corniches, olives etc..",
    appliance: "Cuiseur de riz",
    ustensils: ["Saladier", "Passoire"],
  },
  {
    id: 5,
    name: "Tarte au thon",
    servings: 4,
    ingredients: [
      {
        ingredient: "Pâte feuilletée",
        quantity: 1,
      },
      {
        ingredient: "Thon en miettes",
        quantity: 130,
        unit: "gr",
      },
      {
        ingredient: "Tomate",
        quantity: 2,
      },
      {
        ingredient: "Crème fraîche",
        quantity: 2,
        unit: "Cuillères à soupe",
      },
      {
        ingredient: "Gruyère râpé",
        quantity: 100,
        unit: "gr",
      },
      {
        ingredient: "Moutarde de Dijon",
        quantity: 1,
        unite: "Cuillères à soupe",
      },
    ],
    time: 45,
    description:
      "Étaler la pâte feuilletée aux dimensions du moule, étaler la moutarde sur la pâte feuilletée, ajouter le thon. Découper les tomates en rondelles et les poser sur le poisson, ajouter un peu de Crème fraîche sur toute la tarte et recouvrez de gruyère râpé. Cuire au four 30 minutes",
    appliance: "Four",
    ustensils: ["Moule à tarte", "Râpe à fromage", "Couteau"],
  },
];

export { recipes };
