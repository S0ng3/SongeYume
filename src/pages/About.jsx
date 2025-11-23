import { motion } from 'framer-motion'
import { BookHeart, Sparkles, Target, Coffee } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: BookHeart,
      title: 'Passion pour la lecture',
      description: 'Chaque livre est une aventure, une porte ouverte vers de nouveaux mondes et de nouvelles perspectives.'
    },
    {
      icon: Sparkles,
      title: 'Critiques authentiques',
      description: 'Des avis personnels et honnêtes, écrits avec le cœur, pour partager mes coups de cœur et mes découvertes.'
    },
    {
      icon: Target,
      title: 'Organisation minutieuse',
      description: 'Une bibliothèque soigneusement organisée avec tags, notes et citations pour retrouver facilement mes lectures.'
    },
    {
      icon: Coffee,
      title: 'Moments de lecture',
      description: 'Parce que rien ne vaut un bon livre accompagné d\'une tasse de thé ou de café pour s\'évader du quotidien.'
    }
  ]

  return (
    <div className="page-transition py-12">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="page-title">À propos</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Bienvenue dans mon univers littéraire personnel
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="card-base p-8">
              <h2 className="text-3xl font-bold text-text-light mb-6">
                Songe Yume
              </h2>
              <div className="space-y-4 text-text-light text-opacity-80 leading-relaxed">
                <p>
                  Bienvenue dans ma bibliothèque virtuelle personnelle, un espace où je partage ma passion pour la lecture et mes découvertes littéraires.
                </p>
                <p>
                  Ce site est né de mon envie d'archiver mes lectures, de conserver mes impressions et de partager mes coups de cœur avec d'autres passionnés de livres. Chaque livre que je lis laisse une trace, une émotion, une réflexion, et j'ai voulu créer un lieu où toutes ces expériences puissent vivre et être partagées.
                </p>
                <p>
                  Ici, vous trouverez les critiques honnêtes de Songe, ses citations préférées, et ses réflexions sur les œuvres qui ont marqué son parcours de lectrice. De la littérature classique à la science-fiction, en passant par la fantasy et la philosophie, chaque genre trouve sa place dans son univers.
                </p>
                <p>
                  J'espère que vous prendrez autant de plaisir à explorer cette bibliothèque que j'en ai eu à la construire.
                </p>
              </div>
            </div>

            <div className="card-base p-8 bg-accent bg-opacity-5 border-2 border-accent border-opacity-20">
              <h3 className="text-xl font-bold text-accent mb-3">
                ✨ Ma philosophie de lecture
              </h3>
              <p className="text-text-light text-opacity-80 leading-relaxed italic">
                "Un livre est une fenêtre ouverte sur l'infini. Chaque page tournée est une invitation à voyager, à rêver, à grandir. La lecture n'est pas un passe-temps, c'est une aventure de l'esprit et du cœur."
              </p>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="card-base card-hover p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent bg-opacity-20 rounded-lg p-3 flex-shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-light mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-text-light text-opacity-70 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Technologies Used */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card-base p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-text-light mb-4">
            Technologies utilisées
          </h2>
          <p className="text-text-light text-opacity-70 mb-6">
            Ce site a été conçu avec les technologies modernes du web
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {['React', 'Vite', 'TailwindCSS', 'Framer Motion', 'Recharts', 'React Router'].map((tech, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.1 }}
                className="bg-accent bg-opacity-20 text-accent px-4 py-2 rounded-full font-medium"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center mt-12 card-base p-12 bg-gradient-to-br from-card-bg to-card-hover"
        >
          <h2 className="text-3xl font-bold text-text-light mb-4">
            Envie d'échanger sur nos lectures ?
          </h2>
          <p className="text-text-light text-opacity-70 mb-6 max-w-2xl mx-auto">
            N'hésitez pas à me suivre sur mes réseaux sociaux pour découvrir mes dernières lectures et partager vos recommandations !
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#" className="btn-primary">
              Instagram
            </a>
            <a href="#" className="btn-secondary">
              Babelio
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About

