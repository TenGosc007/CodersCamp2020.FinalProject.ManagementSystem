import { useHistory, useParams, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { motion, AnimatePresence } from "framer-motion";

import * as types from "../../../../utils/types";
import classes from "./teamSidebar.module.scss";

import PrimaryActiveItem from "components/UI/sideBar/sidebarItems/primaryActiveItem/primaryActiveItem";
import PrimaryInactiveItem from "components/UI/sideBar/sidebarItems/primaryInactiveItem/primaryInactiveItem";
import SecondaryItem from "components/UI/sideBar/sidebarItems/secondaryItem/secondaryItem";
import SideBar from "components/UI/sideBar/sideBar";
import PrimaryList from "components/UI/sideBar/sidebarItems/primaryList/primaryList";
import SecondaryList from "components/UI/sideBar/sidebarItems/secondaryList/secondaryList";
import LiItem from "components/UI/sideBar/sidebarItems/liItem/liItem";
import SpinnerLight from "components/UI/spinnerLight/spinner";

import { fetchTeam } from "reduxState/teamDataSlice";
import { RootState } from "reduxState/store";

const TeamSidebar = () => {
  const history = useHistory();
  const { teamId } = useParams<types.TParams>();

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.login.userInformation);
  const userTeam = useSelector((state: RootState) => state.singleTeamData);

  // import list of teams and projects of current active team
  const changeTeam = (e: any) => {
    history.push(`/teams/${e.target.id}`);
  };

  useEffect(() => {
    dispatch(fetchTeam(teamId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId]);

  return (
    <SideBar title={"Your teams"}>
      <PrimaryList>
        {user.teams ? (
          user.teams.map((team: any) => (
            <>
              {team.id === teamId ? (
                <LiItem teamId={team.id}>
                  <PrimaryActiveItem name={team.name} />
                  <AnimatePresence>
                    <motion.div
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                        transition: {
                          delay: 0.3,
                          duration: 0.5,
                        },
                      }}
                    >
                      <SecondaryList>
                        {userTeam.team.projects ? (
                          userTeam.team.projects.map((project: any) => (
                            <>
                              <NavLink
                                to={`/teams/${teamId}/projects/${project.id}`}
                                exact
                                className={classes.navLink}
                                key={project.id}
                              >
                                <SecondaryItem
                                  id={project.id}
                                  name={project.name}
                                />
                              </NavLink>
                            </>
                          ))
                        ) : (
                          <SpinnerLight />
                        )}
                      </SecondaryList>
                    </motion.div>
                  </AnimatePresence>
                </LiItem>
              ) : (
                <PrimaryInactiveItem
                  key={team.id}
                  id={team.id}
                  name={team.name}
                  clickHandler={changeTeam}
                />
              )}
            </>
          ))
        ) : (
          <SpinnerLight />
        )}
      </PrimaryList>
    </SideBar>
  );
};

export default TeamSidebar;
