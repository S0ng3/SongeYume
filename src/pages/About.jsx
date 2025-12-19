import { motion } from 'framer-motion'
import { BookHeart, Sparkles, Target, Coffee } from 'lucide-react'
import { getImagePath } from '../utils/helpers'

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
      description: 'Une bibliothèque soigneusement organisée avec tags, notes et citations pour retrouver facilement mes recommandations.'
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
              {/* Photo de profil */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="flex justify-center mb-8"
              >
                <div className="relative">
                  <img 
                    src={getImagePath('/categories/classique.png')}
                    alt="Photo de profil"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-xl"
                  />
                  <div className="absolute inset-0 rounded-full bg-accent opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                </div>
              </motion.div>

              <h2 className="text-3xl font-bold text-text-light mb-6 text-center">
                Songe Yume
              </h2>
              <div className="space-y-4 text-text-light text-opacity-80 leading-relaxed">
                <p>
                  Bienvenue dans ma bibliothèque virtuelle personnelle, un espace où je partage ma passion pour la lecture et mes découvertes littéraires.
                </p>
                <p>
                  Ce site est né de mon envie d'archiver mes lectures, de conserver mes impressions et de les organiser. J'aime beaucoup les applications existantes de gestion de livre, mais aucune ne correspondait à mon besoin de personnalisation. C'est ainsi que ce site est né !
                </p>
                <p>
                  Je lis essentiellement de la fantasy adulte, car j'aime m'évader dans des mondes imaginaires, beaux et cruels à la fois. J'apprécie les univers bien travaillés, et les personnages forts et bien développés. S'ils sont un peu torturés par le destin, c'est encore mieux !
                </p>
                <p>
                  J'espère que vous prendrez autant de plaisir à explorer cette bibliothèque que j'en ai eu à la construire. Et n'hésitez pas à me contacter sur Instagram ou Babelio pour échanger : je suis timide, mais toujours ouverte à la discussion.
                </p>
              </div>
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
            N'hésitez pas à me suivre sur mes réseaux sociaux pour échanger avec moi sur mes dernières lectures et partager vos recommandations !
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://www.instagram.com/songeyume/" className="btn-primary">
              Instagram
            </a>
            <a href="https://www.babelio.com/monprofil.php?id_user=1167978" className="btn-secondary">
              Babelio
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About

