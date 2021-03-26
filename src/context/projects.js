import { useContext, createContext, useState, useEffect } from 'react';
import { firebase } from '../lib/firebase';
import { useUserContext } from '../context/user';
import useUser from '../hooks/use-user';

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const { user } = useUserContext();
  const [projectName, setProjectName] = useState('');
  const [selected, setSelected] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    setProjects([]);
    setFilteredProjects([]);
    const response = firebase.firestore().collection('projects');
    const data = await response.get();
    data.docs.map(item => {
      setProjects(oldProjects => [
        ...oldProjects,
        { ...item.data(), projectId: item.id },
      ]);
      setFilteredProjects(oldProjects => [
        ...oldProjects,
        { ...item.data(), projectId: item.id },
      ]);
    });
  };

  const handleProject = async e => {
    e.preventDefault();
    const filterSelected = selected.map(item => {
      return item.value;
    });
    if (projectName && selected.length > 0) {
      await firebase.firestore().collection('projects').add({
        name: projectName,
        bugs: [],
        dateCreated: Date.now(),
        members: filterSelected,
        createdBy: user.uid,
        authorName: user.displayName,
      });
      setSelected([]);
      setProjectName('');
      setIsChange(!isChange);
    } else {
      setError('Enter values');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [isChange]);
  useEffect(() => {
    const timer = setTimeout(() => setError(''), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  return (
    <ProjectsContext.Provider
      value={{
        filteredProjects,
        projects,
        handleProject,
        selected,
        setSelected,
        projectName,
        setProjectName,
        isChange,
        setIsChange,
        error,
        setError,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjectsContext = () => {
  return useContext(ProjectsContext);
};
