--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3 (Ubuntu 12.3-1.pgdg16.04+1)
-- Dumped by pg_dump version 12.3 (Ubuntu 12.3-1.pgdg18.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: management; Type: SCHEMA; Schema: -; Owner: grqlnwwboqiqyg
--

CREATE SCHEMA management;


ALTER SCHEMA management OWNER TO grqlnwwboqiqyg;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: CloudSecret; Type: TABLE; Schema: management; Owner: grqlnwwboqiqyg
--

CREATE TABLE management."CloudSecret" (
    secret character varying(255) NOT NULL
);


ALTER TABLE management."CloudSecret" OWNER TO grqlnwwboqiqyg;

--
-- Name: InternalMigration; Type: TABLE; Schema: management; Owner: grqlnwwboqiqyg
--

CREATE TABLE management."InternalMigration" (
    id character varying(255) NOT NULL,
    "appliedAt" timestamp without time zone NOT NULL
);


ALTER TABLE management."InternalMigration" OWNER TO grqlnwwboqiqyg;

--
-- Name: Migration; Type: TABLE; Schema: management; Owner: grqlnwwboqiqyg
--

CREATE TABLE management."Migration" (
    "projectId" character varying(200) DEFAULT ''::character varying NOT NULL,
    revision integer DEFAULT 1 NOT NULL,
    schema text,
    functions text,
    status character varying(20) DEFAULT 'PENDING'::character varying NOT NULL,
    applied integer DEFAULT 0 NOT NULL,
    "rolledBack" integer DEFAULT 0 NOT NULL,
    steps text,
    errors text,
    "startedAt" timestamp without time zone,
    "finishedAt" timestamp without time zone,
    datamodel text,
    CONSTRAINT "Migration_status_check" CHECK (((status)::text = ANY ((ARRAY['PENDING'::character varying, 'IN_PROGRESS'::character varying, 'SUCCESS'::character varying, 'ROLLING_BACK'::character varying, 'ROLLBACK_SUCCESS'::character varying, 'ROLLBACK_FAILURE'::character varying])::text[])))
);


ALTER TABLE management."Migration" OWNER TO grqlnwwboqiqyg;

--
-- Name: Project; Type: TABLE; Schema: management; Owner: grqlnwwboqiqyg
--

CREATE TABLE management."Project" (
    id character varying(200) DEFAULT ''::character varying NOT NULL,
    secrets text,
    "allowQueries" boolean DEFAULT true NOT NULL,
    "allowMutations" boolean DEFAULT true NOT NULL,
    functions text
);


ALTER TABLE management."Project" OWNER TO grqlnwwboqiqyg;

--
-- Name: TelemetryInfo; Type: TABLE; Schema: management; Owner: grqlnwwboqiqyg
--

CREATE TABLE management."TelemetryInfo" (
    id character varying(255) NOT NULL,
    "lastPinged" timestamp without time zone
);


ALTER TABLE management."TelemetryInfo" OWNER TO grqlnwwboqiqyg;

--
-- Name: Cause; Type: TABLE; Schema: public; Owner: grqlnwwboqiqyg
--

CREATE TABLE public."Cause" (
    description text,
    id integer NOT NULL,
    "userId" integer
);


ALTER TABLE public."Cause" OWNER TO grqlnwwboqiqyg;

--
-- Name: Cause_id_seq; Type: SEQUENCE; Schema: public; Owner: grqlnwwboqiqyg
--

CREATE SEQUENCE public."Cause_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Cause_id_seq" OWNER TO grqlnwwboqiqyg;

--
-- Name: Cause_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: grqlnwwboqiqyg
--

ALTER SEQUENCE public."Cause_id_seq" OWNED BY public."Cause".id;


--
-- Name: SocialNetwork; Type: TABLE; Schema: public; Owner: grqlnwwboqiqyg
--

CREATE TABLE public."SocialNetwork" (
    facebook text,
    id integer NOT NULL,
    instagram text,
    linkedin text,
    twitter text,
    "userId" integer NOT NULL
);


ALTER TABLE public."SocialNetwork" OWNER TO grqlnwwboqiqyg;

--
-- Name: SocialNetwork_id_seq; Type: SEQUENCE; Schema: public; Owner: grqlnwwboqiqyg
--

CREATE SEQUENCE public."SocialNetwork_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."SocialNetwork_id_seq" OWNER TO grqlnwwboqiqyg;

--
-- Name: SocialNetwork_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: grqlnwwboqiqyg
--

ALTER SEQUENCE public."SocialNetwork_id_seq" OWNED BY public."SocialNetwork".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: grqlnwwboqiqyg
--

CREATE TABLE public."User" (
    email text NOT NULL,
    firstname text NOT NULL,
    id integer NOT NULL,
    lastname text NOT NULL,
    phone text
);


ALTER TABLE public."User" OWNER TO grqlnwwboqiqyg;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: grqlnwwboqiqyg
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO grqlnwwboqiqyg;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: grqlnwwboqiqyg
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _Migration; Type: TABLE; Schema: public; Owner: grqlnwwboqiqyg
--

CREATE TABLE public."_Migration" (
    revision integer NOT NULL,
    name text NOT NULL,
    datamodel text NOT NULL,
    status text NOT NULL,
    applied integer NOT NULL,
    rolled_back integer NOT NULL,
    datamodel_steps text NOT NULL,
    database_migration text NOT NULL,
    errors text NOT NULL,
    started_at timestamp(3) without time zone NOT NULL,
    finished_at timestamp(3) without time zone
);


ALTER TABLE public."_Migration" OWNER TO grqlnwwboqiqyg;

--
-- Name: _Migration_revision_seq; Type: SEQUENCE; Schema: public; Owner: grqlnwwboqiqyg
--

CREATE SEQUENCE public."_Migration_revision_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."_Migration_revision_seq" OWNER TO grqlnwwboqiqyg;

--
-- Name: _Migration_revision_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: grqlnwwboqiqyg
--

ALTER SEQUENCE public."_Migration_revision_seq" OWNED BY public."_Migration".revision;


--
-- Name: Cause id; Type: DEFAULT; Schema: public; Owner: grqlnwwboqiqyg
--

ALTER TABLE ONLY public."Cause" ALTER COLUMN id SET DEFAULT nextval('public."Cause_id_seq"'::regclass);


--
-- Name: SocialNetwork id; Type: DEFAULT; Schema: public; Owner: grqlnwwboqiqyg
--

ALTER TABLE ONLY public."SocialNetwork" ALTER COLUMN id SET DEFAULT nextval('public."SocialNetwork_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: grqlnwwboqiqyg
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: _Migration revision; Type: DEFAULT; Schema: public; Owner: grqlnwwboqiqyg
--

ALTER TABLE ONLY public."_Migration" ALTER COLUMN revision SET DEFAULT nextval('public."_Migration_revision_seq"'::regclass);


--
-- Name: CloudSecret CloudSecret_pkey; Type: CONSTRAINT; Schema: management; Owner: grqlnwwboqiqyg
--

ALTER TABLE ONLY management."CloudSecret"
    ADD CONSTRAINT "CloudSecret_pkey" PRIMARY KEY (secret);


--
-- Name: InternalMigration InternalMigration_pkey; Type: CONSTRAINT; Schema: management; Owner: grqlnwwboqiqyg
--

ALTER TABLE ONLY management."InternalMigration"
    ADD CONSTRAINT "InternalMigration_pkey" PRIMARY KEY (id);


--
-- Name: Migration Migration_pkey; Type: CONSTRAINT; Schema: management; Owner: grqlnwwboqiqyg
--

ALTER TABLE ONLY management."Migration"
    ADD CONSTRAINT "Migration_pkey" PRIMARY KEY ("projectId", revision);


--
-- Name: Project Project_pkey; Type: CONSTRAINT; Schema: management; Owner: grqlnwwboqiqyg
--

ALTER TABLE ONLY management."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);


--
-- Name: TelemetryInfo TelemetryInfo_pkey; Type: CONSTRAINT; Schema: management; Owner: grqlnwwboqiqyg
--

ALTER TABLE ONLY management."TelemetryInfo"
    ADD CONSTRAINT "TelemetryInfo_pkey" PRIMARY KEY (id);


--
-- Name: Cause Cause_pkey; Type: CONSTRAINT; Schema: public; Owner: grqlnwwboqiqyg
--

ALTER TABLE ONLY public."Cause"
    ADD CONSTRAINT "Cause_pkey" PRIMARY KEY (id);


--
-- Name: SocialNetwork SocialNetwork_pkey; Type: CONSTRAINT; Schema: public; Owner: grqlnwwboqiqyg
--

ALTER TABLE ONLY public."SocialNetwork"
    ADD CONSTRAINT "SocialNetwork_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: grqlnwwboqiqyg
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _Migration _Migration_pkey; Type: CONSTRAINT; Schema: public; Owner: grqlnwwboqiqyg
--

ALTER TABLE ONLY public."_Migration"
    ADD CONSTRAINT "_Migration_pkey" PRIMARY KEY (revision);


--
-- Name: SocialNetwork.userId; Type: INDEX; Schema: public; Owner: grqlnwwboqiqyg
--

CREATE UNIQUE INDEX "SocialNetwork.userId" ON public."SocialNetwork" USING btree ("userId");


--
-- Name: User.email; Type: INDEX; Schema: public; Owner: grqlnwwboqiqyg
--

CREATE UNIQUE INDEX "User.email" ON public."User" USING btree (email);


--
-- Name: Migration migrations_projectid_foreign; Type: FK CONSTRAINT; Schema: management; Owner: grqlnwwboqiqyg
--

ALTER TABLE ONLY management."Migration"
    ADD CONSTRAINT migrations_projectid_foreign FOREIGN KEY ("projectId") REFERENCES management."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Cause Cause_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: grqlnwwboqiqyg
--

ALTER TABLE ONLY public."Cause"
    ADD CONSTRAINT "Cause_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SocialNetwork SocialNetwork_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: grqlnwwboqiqyg
--

ALTER TABLE ONLY public."SocialNetwork"
    ADD CONSTRAINT "SocialNetwork_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: grqlnwwboqiqyg
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO grqlnwwboqiqyg;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO grqlnwwboqiqyg;


--
-- PostgreSQL database dump complete
--

