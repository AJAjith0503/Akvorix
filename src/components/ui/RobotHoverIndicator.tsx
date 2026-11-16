"use client";

import React from "react";
import "./RobotHoverIndicator.css";

export interface RobotHoverIndicatorProps {
  className?: string;
  align?: "center" | "left" | "right";
  size?: "sm" | "md" | "lg";
}

export function RobotHoverIndicator({
  className = "",
  align = "center",
  size = "md",
}: RobotHoverIndicatorProps) {
  return (
    <span
      className={`robot-hover-indicator robot-hover-indicator--${align} robot-hover-indicator--${size} ${className}`}
      aria-hidden="true"
    >
      {/* Robot Avatar */}
      <span className="robot-hover-avatar">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/robot1.png"
          alt=""
          className="robot-hover-img"
          draggable={false}
        />
      </span>

      {/* Snapchat-style typing speech bubble */}
      <span className="robot-hover-bubble">
        <span className="robot-dot dot-1" />
        <span className="robot-dot dot-2" />
        <span className="robot-dot dot-3" />
        <span className="robot-bubble-tail" />
      </span>
    </span>
  );
}

export default RobotHoverIndicator;

