import { faker } from '@faker-js/faker';

const agentsData = Array.from({ length: 10 }, () => generateDataAgent());
const propertiesData = Array.from({ length: 10 }, () => generateDataProperty());
const clientsData = Array.from({ length: 10 }, () => generateDataClient());
const ownersData = Array.from({ length: 10 }, () => generateDataOwner());




function generateDataAgent() {
    return {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        birth: faker.date.birthdate().toISOString().split('T')[0],
        cpf: faker.string.numeric(11),
        address: {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zip: faker.location.zipCode()
        },
        creci: faker.string.numeric(6),
        status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
        role: faker.helpers.arrayElement(['admin', 'agent', 'manager'])
    };
}

function generateDataProperty() {
    return {
        id: faker.string.uuid(),

        owner: {
            name: faker.person.fullName(),
            phone: faker.phone.number(),
            email: faker.internet.email()
        },
        internalNotes: faker.lorem.sentence(),
        financial: {
            salePrice: faker.commerce.price({ min: 50000, max: 1000000, dec: 2 }),
            rentPrice: faker.commerce.price({ min: 500, max: 10000, dec: 2 }),
            iptu: faker.commerce.price({ min: 50, max: 500, dec: 2 }),
            condoFee: faker.commerce.price({ min: 100, max: 2000, dec: 2 }),
            commissionPercentage: faker.number.float({ min: 1, max: 10, fractionDigits: 2 }),
            commissionValue: faker.commerce.price({ min: 1000, max: 50000, dec: 2 }),
            documentStatus: faker.helpers.arrayElement(['Regular', 'Em andamento', 'Pendências'])
        },
        leadManagement: {
            agent: faker.person.fullName(),
            visitsHistory: faker.lorem.sentences(2),
            interested: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
                name: faker.person.fullName(),
                contact: faker.phone.number(),
                history: faker.lorem.sentences(2)
            })),
            createdAt: faker.date.past().toISOString(),
            updatedAt: faker.date.recent().toISOString(),
            leadSource: faker.helpers.arrayElement(['Indicação', 'Site', 'Redes Sociais', 'Outros'])
        },
        displayInfo: {
            title:faker.word.words(4),
            description:faker.lorem.paragraphs(2),
            status: faker.helpers.arrayElement(['Disponível', 'Reservado', 'Vendido', 'Alugado', 'Indisponível']),
            type: faker.helpers.arrayElement(['Apartamento', 'Casa', 'Cobertura', 'Terreno', 'Comercial', 'Rural']),
            purpose: faker.helpers.arrayElement(['Venda', 'Aluguel', 'Temporada']),
            origin: faker.helpers.arrayElement(['Construtora', 'Proprietário Particular']),
            totalArea: faker.number.int({ min: 50, max: 1000 }),
            usableArea: faker.number.int({ min: 40, max: 900 }),
            bedrooms: faker.number.int({ min: 1, max: 6 }),
            bathrooms: faker.number.int({ min: 1, max: 5 }),
            suites: faker.number.int({ min: 0, max: 3 }),
            garageSpaces: faker.number.int({ min: 0, max: 4 }),
            floor: faker.number.int({ min: 1, max: 30 }),
            yearBuilt: faker.number.int({ min: 1950, max: 2023 }),
            furnished: faker.helpers.arrayElement(['Sim', 'Não']),
            additionalFeatures: faker.helpers.arrayElements(['Piscina', 'Churrasqueira', 'Elevador', 'Academia', 'Salão de festas', 'Pet Friendly'], 3),
            gallery: Array.from({ length: 5 }, () => faker.image.urlPicsumPhotos()),
            virtualTour: faker.image.url()
        },
        location: {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zip: faker.location.zipCode(),
            referencePoint: faker.lorem.sentence(),
            neighborhood:"Belvedere"
        }
    };
}




function generateDataClient() {
    return {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        cpf: faker.string.numeric(11),
        agent:agentsData[2],
        address: {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zip: faker.location.zipCode()
        },
        interestedIn: faker.helpers.arrayElements(['house', 'apartment', 'land'], 2),
        properties:propertiesData[0]
    };
    
}

function generateDataOwner() {
    return {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        cpf: faker.string.numeric(11),
        address: {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zip: faker.location.zipCode()
        }
    };
}
// console.log('gernado dados ficticios')
export{ agentsData, propertiesData, clientsData, ownersData };
