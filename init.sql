--
-- PostgreSQL database dump
--

-- Dumped from database version 10.13 (Debian 10.13-1.pgdg90+1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

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
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: card; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.card (
    id integer NOT NULL,
    title text NOT NULL
);


ALTER TABLE public.card OWNER TO "user";

--
-- Name: card_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.card_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.card_id_seq OWNER TO "user";

--
-- Name: card_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.card_id_seq OWNED BY public.card.id;


--
-- Name: column_; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.column_ (
    id integer NOT NULL,
    title text NOT NULL
);


ALTER TABLE public.column_ OWNER TO "user";

--
-- Name: column__id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.column__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.column__id_seq OWNER TO "user";

--
-- Name: column__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.column__id_seq OWNED BY public.column_.id;


--
-- Name: column_card; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.column_card (
    id integer NOT NULL,
    column_id integer,
    card_id integer
);


ALTER TABLE public.column_card OWNER TO "user";

--
-- Name: column_card_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.column_card_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.column_card_id_seq OWNER TO "user";

--
-- Name: column_card_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.column_card_id_seq OWNED BY public.column_card.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO "user";

--
-- Name: table_; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.table_ (
    id integer NOT NULL,
    title text NOT NULL
);


ALTER TABLE public.table_ OWNER TO "user";

--
-- Name: table__id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.table__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.table__id_seq OWNER TO "user";

--
-- Name: table__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.table__id_seq OWNED BY public.table_.id;


--
-- Name: table_column; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.table_column (
    id integer NOT NULL,
    table_id integer,
    column_id integer
);


ALTER TABLE public.table_column OWNER TO "user";

--
-- Name: table_column_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.table_column_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.table_column_id_seq OWNER TO "user";

--
-- Name: table_column_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.table_column_id_seq OWNED BY public.table_column.id;


--
-- Name: user_; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.user_ (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.user_ OWNER TO "user";

--
-- Name: user__id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.user__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user__id_seq OWNER TO "user";

--
-- Name: user__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.user__id_seq OWNED BY public.user_.id;


--
-- Name: user_table; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.user_table (
    id integer NOT NULL,
    user_id integer,
    table_id integer
);


ALTER TABLE public.user_table OWNER TO "user";

--
-- Name: user_table_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.user_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_table_id_seq OWNER TO "user";

--
-- Name: user_table_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.user_table_id_seq OWNED BY public.user_table.id;


--
-- Name: card id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.card ALTER COLUMN id SET DEFAULT nextval('public.card_id_seq'::regclass);


--
-- Name: column_ id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.column_ ALTER COLUMN id SET DEFAULT nextval('public.column__id_seq'::regclass);


--
-- Name: column_card id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.column_card ALTER COLUMN id SET DEFAULT nextval('public.column_card_id_seq'::regclass);


--
-- Name: table_ id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.table_ ALTER COLUMN id SET DEFAULT nextval('public.table__id_seq'::regclass);


--
-- Name: table_column id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.table_column ALTER COLUMN id SET DEFAULT nextval('public.table_column_id_seq'::regclass);


--
-- Name: user_ id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_ ALTER COLUMN id SET DEFAULT nextval('public.user__id_seq'::regclass);


--
-- Name: user_table id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_table ALTER COLUMN id SET DEFAULT nextval('public.user_table_id_seq'::regclass);


--
-- Data for Name: card; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.card (id, title) FROM stdin;
\.


--
-- Data for Name: column_; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.column_ (id, title) FROM stdin;
\.


--
-- Data for Name: column_card; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.column_card (id, column_id, card_id) FROM stdin;
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.session (sid, sess, expire) FROM stdin;
\.


--
-- Data for Name: table_; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.table_ (id, title) FROM stdin;
\.


--
-- Data for Name: table_column; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.table_column (id, table_id, column_id) FROM stdin;
\.


--
-- Data for Name: user_; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.user_ (id, username, password) FROM stdin;
\.


--
-- Data for Name: user_table; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.user_table (id, user_id, table_id) FROM stdin;
\.


--
-- Name: card_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.card_id_seq', 1, false);


--
-- Name: column__id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.column__id_seq', 1, false);


--
-- Name: column_card_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.column_card_id_seq', 1, false);


--
-- Name: table__id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.table__id_seq', 1, false);


--
-- Name: table_column_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.table_column_id_seq', 1, false);


--
-- Name: user__id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.user__id_seq', 1, false);


--
-- Name: user_table_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.user_table_id_seq', 1, false);


--
-- Name: card card_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.card
    ADD CONSTRAINT card_pkey PRIMARY KEY (id);


--
-- Name: column_ column__pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.column_
    ADD CONSTRAINT column__pkey PRIMARY KEY (id);


--
-- Name: column_card column_card_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.column_card
    ADD CONSTRAINT column_card_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: table_ table__pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.table_
    ADD CONSTRAINT table__pkey PRIMARY KEY (id);


--
-- Name: table_column table_column_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.table_column
    ADD CONSTRAINT table_column_pkey PRIMARY KEY (id);


--
-- Name: user_ user__pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_
    ADD CONSTRAINT user__pkey PRIMARY KEY (id);


--
-- Name: user_ user__username_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_
    ADD CONSTRAINT user__username_key UNIQUE (username);


--
-- Name: user_table user_table_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_table
    ADD CONSTRAINT user_table_pkey PRIMARY KEY (id);


--
-- Name: column_card column_card_card_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.column_card
    ADD CONSTRAINT column_card_card_id_fkey FOREIGN KEY (card_id) REFERENCES public.card(id) ON DELETE CASCADE;


--
-- Name: column_card column_card_column_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.column_card
    ADD CONSTRAINT column_card_column_id_fkey FOREIGN KEY (column_id) REFERENCES public.column_(id) ON DELETE CASCADE;


--
-- Name: table_column table_column_column_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.table_column
    ADD CONSTRAINT table_column_column_id_fkey FOREIGN KEY (column_id) REFERENCES public.column_(id) ON DELETE CASCADE;


--
-- Name: table_column table_column_table_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.table_column
    ADD CONSTRAINT table_column_table_id_fkey FOREIGN KEY (table_id) REFERENCES public.table_(id) ON DELETE CASCADE;


--
-- Name: user_table user_table_table_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_table
    ADD CONSTRAINT user_table_table_id_fkey FOREIGN KEY (table_id) REFERENCES public.table_(id) ON DELETE CASCADE;


--
-- Name: user_table user_table_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_table
    ADD CONSTRAINT user_table_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_(id);


--
-- PostgreSQL database dump complete
--

