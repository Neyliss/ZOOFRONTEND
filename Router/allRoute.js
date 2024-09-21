import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/signin", "Connexion", "/pages/auth/signin.html", ["disconnected","admin"], "/JS/auth/signin.js"),
    new Route("/signup", "Inscription", "/pages/auth/signup.html", ["admin"], "/JS/auth/singup.js"),
    new Route("/account", "Mon compte", "/pages/auth/account.html", ["employe", "admin"]),
    new Route("/editPassword", "Changement de mot de passe", "/pages/auth/editPassword.html", ["employe", "admin", "veterinaire"], "/JS/auth/changepassword.js"),
    new Route("/contact", "Contact", "/pages/Reservation/contact.html", ["disconnected", "admin"], "/JS/Contact/contact.js"),
    new Route("/jungle", "Jungle", "/pages/Habitation/jungle.html", ["disconnected", "admin"], "/JS/Habitat/animal.js"),
    new Route("/marais", "Marais", "/pages/Habitation/marais.html", ["disconnected","admin"], "/JS/Habitat/animal.js"),
    new Route("/savane", "Savane", "/pages/Habitation/savane.html", ["disconnected", "admin"], "/JS/Habitat/animal.js"),
    new Route("/service", "Service", "/pages/service.html", [],"/JS/service/service.js","admin"),
    new Route("/habitat", "Habitats", "/pages/habitat.html", [], "/JS/Habitat/habitat.js", "admin"),
    new Route("/veterinaire", "Espace Veterniaire", "/pages/veterinaire.html", ["veterinaire", "admin"], "/JS/veto/veterinaire.js"),
    new Route("/avis", "Laisser un avis", "/pages/avis.html", [], "/JS/avis/avis.js"),
];
//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "ZOO";