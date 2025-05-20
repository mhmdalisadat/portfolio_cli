"use client";

import * as React from "react";
import { myProjects } from "../data/works";
import WorksUI from "./works/works-ui";

export default function Works() {
  return <WorksUI projects={myProjects} />;
}
