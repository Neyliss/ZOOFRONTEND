import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/habitat", "La galerie", "/pages/habitat.html", [],),
    new Route("/signin", "Connexion", "/pages/auth/signin.html", ["disconnected"], "/JS/auth/signin.js"),
    new Route("/signup", "Inscription", "/pages/auth/signup.html", ["disconnected"], "/JS/auth/singup.js"),
    new Route("/account", "Mon compte", "/pages/auth/account.html", ["client", "admin"]),
    new Route("/editPassword", "Changement de mot de passe", "/pages/auth/editPassword.html", ["client", "admin"]),
    new Route("/allresa", "Vos réservations", "/pages/reservation/allresa.html", ["client"]),
    new Route("/reserver", "Réserver", "/pages/reservation/reserver.html", ["client"]),
    new Route("/contact", "Contact", "/pages/Reservation/contact.html", ["disconnected"], "/JS/Contact/contact.js"),
    new Route("/habitat", "Habitat", "/pages/habitat.html", [],),
    new Route("/jungle", "Jungle", "/pages/Habitation/jungle.html", ["disconnected"],),
    new Route("/marais", "Marais", "/pages/Habitation/marais.html", ["disconnected"],),
    new Route("/sauvage", "Sauvage", "/pages/Habitation/sauvage.html", ["disconnected"],),
    
];
    

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "ZOO";