
import { AppSidebar } from "@/components/app-sidebar";

const Groups = () => {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Groupes de véhicules</h1>
          
          <div className="grid gap-6">
            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Gestion des groupes</h2>
              <p className="text-gray-600 mb-4">
                Cette page vous permet de gérer les différents groupes de véhicules de votre flotte.
              </p>
              <div className="p-4 bg-blue-50 rounded-md border border-blue-100 text-blue-800">
                <p>Fonctionnalités à venir:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Création et modification de groupes</li>
                  <li>Attribution de véhicules aux groupes</li>
                  <li>Statistiques par groupe</li>
                  <li>Gestion des autorisations par groupe</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Groups;
