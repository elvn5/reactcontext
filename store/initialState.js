export default {
  bucket: [],
  products: {
    all: {
      data: [],
    },
    top: {
      data: [],
    },
    sales: {
      data: [],
    },
    catalog: {
      data: [],
    },
    searchSuggestions: {
      data: [],
    },
  },
  user: {
    isLoggedIn: false,
    otp: {},
    info: {},
    orders: {
      data: [
        {
          id: 1235,
          status: 'accepted',
          totalPrice: 1234,
          orderDate: new Date(2021, 6, 22, 13, 43),
          items: [
            {
              id: 692,
              images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU'],
              preview: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU',
              title: 'Витамин С 900 мг 5 г порош.шипуч.№10 саше-пакет',
              description: 'В качестве биологически активной добавки к пище, дополнительного источника витаминов и минералов.',
              receptRequired: true,
              oldPrice: 13920,
              price: 12980,
              available: true,
              manufactureCountry: 'Россия',
              manufacture: 'АВАНТА АО',
              brand: 'БЕЛОРУЧКА',
              relizeForm: 'Крем для рук 75мл, туба',
              amount: 1,
              composition: 'вода, глицерин, масло минеральное, каприлик/каприк триглицерид, цетеариловый спирт, вазелин, глицерилстеарат, гидроксиэтилмочевина, диметикон, феноксиэтанол, этилгексилглицерин, масло подсолнечное, масло фисташковое, масло оливковое, цетилфосфат калия, витамин Е-ацетат, витамин F, ПЭГ-7 глицерилкокоат, ПЭГ-40 гидрогенат касторового масла, карбомер, ароматическая композиция вода, глицерин, масло минеральное, каприлик/каприк триглицерид, цетеариловый спирт, вазелин, глицерилстеарат, гидроксиэтилмочевина, диметикон, феноксиэтанол, этилгексилглицерин, масло подсолнечное, масло фисташковое, масло оливковое, цетилфосфат калия, витамин Е-ацетат, витамин F, ПЭГ-7 глицерилкокоат, ПЭГ-40 гидрогенат касторового масла, карбомер, ароматическая композиция'
            },
            {
              id: 693,
              images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU'],
              preview: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU',
              title: 'Витамин С 900 мг 5 г порош.шипуч.№10 саше-пакет',
              description: 'В качестве биологически активной добавки к пище, дополнительного источника витаминов и минералов.',
              receptRequired: true,
              oldPrice: 13920,
              price: 12980,
              available: true,
              manufactureCountry: 'Россия',
              manufacture: 'АВАНТА АО',
              brand: 'БЕЛОРУЧКА',
              relizeForm: 'Крем для рук 75мл, туба',
              amount: 2,
              composition: 'вода, глицерин, масло минеральное, каприлик/каприк триглицерид, цетеариловый спирт, вазелин, глицерилстеарат, гидроксиэтилмочевина, диметикон, феноксиэтанол, этилгексилглицерин, масло подсолнечное, масло фисташковое, масло оливковое, цетилфосфат калия, витамин Е-ацетат, витамин F, ПЭГ-7 глицерилкокоат, ПЭГ-40 гидрогенат касторового масла, карбомер, ароматическая композиция вода, глицерин, масло минеральное, каприлик/каприк триглицерид, цетеариловый спирт, вазелин, глицерилстеарат, гидроксиэтилмочевина, диметикон, феноксиэтанол, этилгексилглицерин, масло подсолнечное, масло фисташковое, масло оливковое, цетилфосфат калия, витамин Е-ацетат, витамин F, ПЭГ-7 глицерилкокоат, ПЭГ-40 гидрогенат касторового масла, карбомер, ароматическая композиция'
            },
            {
              id: 694,
              images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU'],
              preview: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU',
              title: 'Витамин С 900 мг 5 г порош.шипуч.№10 саше-пакет',
              description: 'В качестве биологически активной добавки к пище, дополнительного источника витаминов и минералов.',
              receptRequired: true,
              oldPrice: 13920,
              price: 12980,
              available: true,
              manufactureCountry: 'Россия',
              manufacture: 'АВАНТА АО',
              brand: 'БЕЛОРУЧКА',
              relizeForm: 'Крем для рук 75мл, туба',
              amount: 1,
              composition: 'вода, глицерин, масло минеральное, каприлик/каприк триглицерид, цетеариловый спирт, вазелин, глицерилстеарат, гидроксиэтилмочевина, диметикон, феноксиэтанол, этилгексилглицерин, масло подсолнечное, масло фисташковое, масло оливковое, цетилфосфат калия, витамин Е-ацетат, витамин F, ПЭГ-7 глицерилкокоат, ПЭГ-40 гидрогенат касторового масла, карбомер, ароматическая композиция вода, глицерин, масло минеральное, каприлик/каприк триглицерид, цетеариловый спирт, вазелин, глицерилстеарат, гидроксиэтилмочевина, диметикон, феноксиэтанол, этилгексилглицерин, масло подсолнечное, масло фисташковое, масло оливковое, цетилфосфат калия, витамин Е-ацетат, витамин F, ПЭГ-7 глицерилкокоат, ПЭГ-40 гидрогенат касторового масла, карбомер, ароматическая композиция'
            }
          ]
        },
        {
          id: 1335,
          status: 'delivered',
          totalPrice: 1234,
          orderDate: new Date(2021, 1, 15, 18, 43),
          items: [
            {
              id: 692,
              images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU'],
              preview: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU',
              title: 'Витамин С 900 мг 5 г порош.шипуч.№10 саше-пакет',
              description: 'В качестве биологически активной добавки к пище, дополнительного источника витаминов и минералов.',
              receptRequired: true,
              oldPrice: 13920,
              price: 12980,
              available: true,
              manufactureCountry: 'Россия',
              manufacture: 'АВАНТА АО',
              brand: 'БЕЛОРУЧКА',
              relizeForm: 'Крем для рук 75мл, туба',
              amount: 4,
              composition: 'вода, глицерин, масло минеральное, каприлик/каприк триглицерид, цетеариловый спирт, вазелин, глицерилстеарат, гидроксиэтилмочевина, диметикон, феноксиэтанол, этилгексилглицерин, масло подсолнечное, масло фисташковое, масло оливковое, цетилфосфат калия, витамин Е-ацетат, витамин F, ПЭГ-7 глицерилкокоат, ПЭГ-40 гидрогенат касторового масла, карбомер, ароматическая композиция вода, глицерин, масло минеральное, каприлик/каприк триглицерид, цетеариловый спирт, вазелин, глицерилстеарат, гидроксиэтилмочевина, диметикон, феноксиэтанол, этилгексилглицерин, масло подсолнечное, масло фисташковое, масло оливковое, цетилфосфат калия, витамин Е-ацетат, витамин F, ПЭГ-7 глицерилкокоат, ПЭГ-40 гидрогенат касторового масла, карбомер, ароматическая композиция'
            },
            {
              id: 693,
              images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU'],
              preview: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU',
              title: 'Витамин С 900 мг 5 г порош.шипуч.№10 саше-пакет',
              description: 'В качестве биологически активной добавки к пище, дополнительного источника витаминов и минералов.',
              receptRequired: true,
              oldPrice: 13920,
              price: 12980,
              available: true,
              manufactureCountry: 'Россия',
              manufacture: 'АВАНТА АО',
              brand: 'БЕЛОРУЧКА',
              relizeForm: 'Крем для рук 75мл, туба',
              amount: 1,
              composition: 'вода, глицерин, масло минеральное, каприлик/каприк триглицерид, цетеариловый спирт, вазелин, глицерилстеарат, гидроксиэтилмочевина, диметикон, феноксиэтанол, этилгексилглицерин, масло подсолнечное, масло фисташковое, масло оливковое, цетилфосфат калия, витамин Е-ацетат, витамин F, ПЭГ-7 глицерилкокоат, ПЭГ-40 гидрогенат касторового масла, карбомер, ароматическая композиция вода, глицерин, масло минеральное, каприлик/каприк триглицерид, цетеариловый спирт, вазелин, глицерилстеарат, гидроксиэтилмочевина, диметикон, феноксиэтанол, этилгексилглицерин, масло подсолнечное, масло фисташковое, масло оливковое, цетилфосфат калия, витамин Е-ацетат, витамин F, ПЭГ-7 глицерилкокоат, ПЭГ-40 гидрогенат касторового масла, карбомер, ароматическая композиция'
            },
            {
              id: 694,
              images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU'],
              preview: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU',
              title: 'Витамин С 900 мг 5 г порош.шипуч.№10 саше-пакет',
              description: 'В качестве биологически активной добавки к пище, дополнительного источника витаминов и минералов.',
              receptRequired: true,
              oldPrice: 13920,
              price: 12980,
              available: true,
              manufactureCountry: 'Россия',
              manufacture: 'АВАНТА АО',
              brand: 'БЕЛОРУЧКА',
              relizeForm: 'Крем для рук 75мл, туба',
              amount: 1,
              composition: 'вода, глицерин, масло минеральное, каприлик/каприк триглицерид, цетеариловый спирт, вазелин, глицерилстеарат, гидроксиэтилмочевина, диметикон, феноксиэтанол, этилгексилглицерин, масло подсолнечное, масло фисташковое, масло оливковое, цетилфосфат калия, витамин Е-ацетат, витамин F, ПЭГ-7 глицерилкокоат, ПЭГ-40 гидрогенат касторового масла, карбомер, ароматическая композиция вода, глицерин, масло минеральное, каприлик/каприк триглицерид, цетеариловый спирт, вазелин, глицерилстеарат, гидроксиэтилмочевина, диметикон, феноксиэтанол, этилгексилглицерин, масло подсолнечное, масло фисташковое, масло оливковое, цетилфосфат калия, витамин Е-ацетат, витамин F, ПЭГ-7 глицерилкокоат, ПЭГ-40 гидрогенат касторового масла, карбомер, ароматическая композиция'
            }
          ]
        },
        {
          id: 2335,
          status: 'declined',
          totalPrice: 1234,
          orderDate: new Date(2021, 2, 25, 16, 43),
          items: [
            {
              id: 692,
              images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU'],
              preview: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU',
              title: 'Витамин С 900 мг 5 г порош.шипуч.№10 саше-пакет',
              description: 'В качестве биологически активной добавки к пище, дополнительного источника витаминов и минералов.',
              receptRequired: true,
              oldPrice: 13920,
              price: 12980,
              available: true,
              manufactureCountry: 'Россия',
              manufacture: 'АВАНТА АО',
              brand: 'БЕЛОРУЧКА',
              relizeForm: 'Крем для рук 75мл, туба',
              amount: 3,
              composition: 'вода, глицерин, масло минеральное, каприлик/каприк триглицерид, цетеариловый спирт, вазелин, глицерилстеарат, гидроксиэтилмочевина, диметикон, феноксиэтанол, этилгексилглицерин, масло подсолнечное, масло фисташковое, масло оливковое, цетилфосфат калия, витамин Е-ацетат, витамин F, ПЭГ-7 глицерилкокоат, ПЭГ-40 гидрогенат касторового масла, карбомер, ароматическая композиция вода, глицерин, масло минеральное, каприлик/каприк триглицерид, цетеариловый спирт, вазелин, глицерилстеарат, гидроксиэтилмочевина, диметикон, феноксиэтанол, этилгексилглицерин, масло подсолнечное, масло фисташковое, масло оливковое, цетилфосфат калия, витамин Е-ацетат, витамин F, ПЭГ-7 глицерилкокоат, ПЭГ-40 гидрогенат касторового масла, карбомер, ароматическая композиция'
            },
            {
              id: 693,
              images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU'],
              preview: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU',
              title: 'Витамин С 900 мг 5 г порош.шипуч.№10 саше-пакет',
              description: 'В качестве биологически активной добавки к пище, дополнительного источника витаминов и минералов.',
              receptRequired: true,
              oldPrice: 13920,
              price: 12980,
              available: true,
              manufactureCountry: 'Россия',
              manufacture: 'АВАНТА АО',
              brand: 'БЕЛОРУЧКА',
              relizeForm: 'Крем для рук 75мл, туба',
              amount: 1,
              composition: 'вода, глицерин, масло минеральное, каприлик/каприк триглицерид, цетеариловый спирт, вазелин, глицерилстеарат, гидроксиэтилмочевина, диметикон, феноксиэтанол, этилгексилглицерин, масло подсолнечное, масло фисташковое, масло оливковое, цетилфосфат калия, витамин Е-ацетат, витамин F, ПЭГ-7 глицерилкокоат, ПЭГ-40 гидрогенат касторового масла, карбомер, ароматическая композиция вода, глицерин, масло минеральное, каприлик/каприк триглицерид, цетеариловый спирт, вазелин, глицерилстеарат, гидроксиэтилмочевина, диметикон, феноксиэтанол, этилгексилглицерин, масло подсолнечное, масло фисташковое, масло оливковое, цетилфосфат калия, витамин Е-ацетат, витамин F, ПЭГ-7 глицерилкокоат, ПЭГ-40 гидрогенат касторового масла, карбомер, ароматическая композиция'
            },
            {
              id: 694,
              images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU'],
              preview: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEOjCw-9M2dcnaKmDjq3jZRpVU6UhccJGmQ&usqp=CAU',
              title: 'Витамин С 900 мг 5 г порош.шипуч.№10 саше-пакет',
              description: 'В качестве биологически активной добавки к пище, дополнительного источника витаминов и минералов.',
              receptRequired: true,
              oldPrice: 13920,
              price: 12980,
              available: true,
              manufactureCountry: 'Россия',
              manufacture: 'АВАНТА АО',
              brand: 'БЕЛОРУЧКА',
              relizeForm: 'Крем для рук 75мл, туба',
              amount: 1,
              composition: 'вода, глицерин, масло минеральное, каприлик/каприк триглицерид, цетеариловый спирт, вазелин, глицерилстеарат, гидроксиэтилмочевина, диметикон, феноксиэтанол, этилгексилглицерин, масло подсолнечное, масло фисташковое, масло оливковое, цетилфосфат калия, витамин Е-ацетат, витамин F, ПЭГ-7 глицерилкокоат, ПЭГ-40 гидрогенат касторового масла, карбомер, ароматическая композиция вода, глицерин, масло минеральное, каприлик/каприк триглицерид, цетеариловый спирт, вазелин, глицерилстеарат, гидроксиэтилмочевина, диметикон, феноксиэтанол, этилгексилглицерин, масло подсолнечное, масло фисташковое, масло оливковое, цетилфосфат калия, витамин Е-ацетат, витамин F, ПЭГ-7 глицерилкокоат, ПЭГ-40 гидрогенат касторового масла, карбомер, ароматическая композиция'
            }
          ]
        }
      ]
    },
  },
  info: {
    banners: {
      data: [
        { title: 'kek', url: 'https://images.food52.com/IjL6uGq1jFuk18cPGiZTUVphPIo=/1200x1200/103b54ba-45fd-47d5-84f1-d9e3ed1245a8--2019-1022_kek-lapis-sarawak_3x2_rocky-luten_028.jpg' },
        { title: 'kek1', url: 'https://images.food52.com/IjL6uGq1jFuk18cPGiZTUVphPIo=/1200x1200/103b54ba-45fd-47d5-84f1-d9e3ed1245a8--2019-1022_kek-lapis-sarawak_3x2_rocky-luten_028.jpg' },
        { title: 'kek2', url: 'https://images.food52.com/IjL6uGq1jFuk18cPGiZTUVphPIo=/1200x1200/103b54ba-45fd-47d5-84f1-d9e3ed1245a8--2019-1022_kek-lapis-sarawak_3x2_rocky-luten_028.jpg' },
        { title: 'kek3', url: 'https://images.food52.com/IjL6uGq1jFuk18cPGiZTUVphPIo=/1200x1200/103b54ba-45fd-47d5-84f1-d9e3ed1245a8--2019-1022_kek-lapis-sarawak_3x2_rocky-luten_028.jpg' },
        { title: 'kek4', url: 'https://images.food52.com/IjL6uGq1jFuk18cPGiZTUVphPIo=/1200x1200/103b54ba-45fd-47d5-84f1-d9e3ed1245a8--2019-1022_kek-lapis-sarawak_3x2_rocky-luten_028.jpg' },
      ],
    },
    about: {},
    contacts: {},
    pharmacy: {},
    news: {},
    faq: {},
  },
};
