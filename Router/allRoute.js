import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/signin", "Connexion", "/pages/auth/signin.html", ["disconnected"], "/JS/auth/signin.js"),
    new Route("/signup", "Inscription", "/pages/auth/signup.html", ["admin"], "/JS/auth/singup.js"),
    new Route("/account", "Mon compte", "/pages/auth/account.html", ["client", "admin"]),
    new Route("/editPassword", "Changement de mot de passe", "/pages/auth/editPassword.html", ["client", "admin"]),
    new Route("/allresa", "Vos réservations", "/pages/reservation/allresa.html", ["client"]),
    new Route("/reserver", "Réserver", "/pages/reservation/reserver.html", ["client"]),
    new Route("/contact", "Contact", "/pages/Reservation/contact.html", ["disconnected"], "/JS/Contact/contact.js"),
    new Route("/jungle", "Jungle", "/pages/Habitation/jungle.html", ["disconnected"],"/JS/Habitat/animal.js"),
    new Route("/marais", "Marais", "/pages/Habitation/marais.html", ["disconnected"], "/JS/Habitat/animal.js"),
    new Route("/savane", "Savane", "/pages/Habitation/savane.html", ["disconnected"], "/JS/Habitat/animal.js"),
    new Route("/service", "Service", "/pages/service.html", [],),
    new Route("/habitat", "Habitats", "/pages/habitat.html", [],"/JS/Habitat/habitat.js"),
    new Route("/veterinaire", "Espace Veterniaire", "/pages/veterinaire.html", [],),
    new Route("/avis", "Laisser un avis", "/pages/avis.html", [], "/JS/avis.js"),

];
    

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "ZOO";