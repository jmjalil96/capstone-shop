export interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  image: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'María González',
    role: 'Cliente desde 2018',
    content:
      'El equipo de Capstone me ayudó a encontrar el seguro perfecto para mi familia. Su asesoramiento personalizado marcó la diferencia cuando tuvimos que hacer una reclamación.',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    rating: 5,
  },
  {
    id: 2,
    name: 'Carlos Martínez',
    role: 'Dueño de negocio',
    content:
      'Como propietario de un pequeño negocio, necesitaba un seguro que realmente entendiera mis necesidades. Capstone me ofreció la mejor cobertura y me ahorró dinero en el proceso.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    rating: 5,
  },
  {
    id: 3,
    name: 'Laura Pérez',
    role: 'Cliente desde 2020',
    content:
      'Después de un accidente automovilístico, el equipo de Capstone se encargó de todo. Su profesionalismo y dedicación hicieron que un momento estresante fuera mucho más llevadero.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
    rating: 5,
  },
  {
    id: 4,
    name: 'Roberto Díaz',
    role: 'Familia asegurada',
    content:
      'La transparencia y honestidad de Capstone es incomparable. Siempre me explican claramente mis opciones y me ayudan a tomar las mejores decisiones para mi familia.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    rating: 5,
  },
  {
    id: 5,
    name: 'Ana Rodríguez',
    role: 'Emprendedora',
    content:
      'Llevo 5 años con Capstone y su servicio es excepcional. Siempre están disponibles cuando los necesito y me han ayudado a optimizar mis costos de seguros.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=770&q=80',
    rating: 5,
  },
]
