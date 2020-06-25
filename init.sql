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
-- Name: board; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.board (
    id integer NOT NULL,
    title text NOT NULL
);


ALTER TABLE public.board OWNER TO "user";

--
-- Name: board_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.board_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.board_id_seq OWNER TO "user";

--
-- Name: board_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.board_id_seq OWNED BY public.board.id;


--
-- Name: card; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.card (
    id integer NOT NULL,
    title text NOT NULL,
    color text NOT NULL,
    text_color text NOT NULL,
    "position" integer NOT NULL,
    column_id integer
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
-- Name: card_tag; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.card_tag (
    id integer NOT NULL,
    card_id integer,
    tag_id integer
);


ALTER TABLE public.card_tag OWNER TO "user";

--
-- Name: card_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.card_tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.card_tag_id_seq OWNER TO "user";

--
-- Name: card_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.card_tag_id_seq OWNED BY public.card_tag.id;


--
-- Name: column_; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.column_ (
    id integer NOT NULL,
    title text NOT NULL,
    color text NOT NULL,
    text_color text NOT NULL,
    "position" integer NOT NULL,
    board_id integer
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
-- Name: session; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO "user";

--
-- Name: tag; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.tag (
    id integer NOT NULL,
    title text NOT NULL,
    board_id integer
);


ALTER TABLE public.tag OWNER TO "user";

--
-- Name: tag_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tag_id_seq OWNER TO "user";

--
-- Name: tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.tag_id_seq OWNED BY public.tag.id;


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
-- Name: user_board; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.user_board (
    id integer NOT NULL,
    user_id integer,
    board_id integer,
    owner boolean NOT NULL
);


ALTER TABLE public.user_board OWNER TO "user";

--
-- Name: user_board_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.user_board_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_board_id_seq OWNER TO "user";

--
-- Name: user_board_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.user_board_id_seq OWNED BY public.user_board.id;


--
-- Name: board id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.board ALTER COLUMN id SET DEFAULT nextval('public.board_id_seq'::regclass);


--
-- Name: card id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.card ALTER COLUMN id SET DEFAULT nextval('public.card_id_seq'::regclass);


--
-- Name: card_tag id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.card_tag ALTER COLUMN id SET DEFAULT nextval('public.card_tag_id_seq'::regclass);


--
-- Name: column_ id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.column_ ALTER COLUMN id SET DEFAULT nextval('public.column__id_seq'::regclass);


--
-- Name: tag id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.tag ALTER COLUMN id SET DEFAULT nextval('public.tag_id_seq'::regclass);


--
-- Name: user_ id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_ ALTER COLUMN id SET DEFAULT nextval('public.user__id_seq'::regclass);


--
-- Name: user_board id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_board ALTER COLUMN id SET DEFAULT nextval('public.user_board_id_seq'::regclass);


--
-- Data for Name: board; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.board (id, title) FROM stdin;
\.


--
-- Data for Name: card; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.card (id, title, color, text_color, "position", column_id) FROM stdin;
\.


--
-- Data for Name: card_tag; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.card_tag (id, card_id, tag_id) FROM stdin;
\.


--
-- Data for Name: column_; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.column_ (id, title, color, text_color, "position", board_id) FROM stdin;
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.session (sid, sess, expire) FROM stdin;
\.


--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.tag (id, title, board_id) FROM stdin;
\.


--
-- Data for Name: user_; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.user_ (id, username, password) FROM stdin;
\.


--
-- Data for Name: user_board; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.user_board (id, user_id, board_id, owner) FROM stdin;
\.


--
-- Name: board_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.board_id_seq', 1, false);


--
-- Name: card_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.card_id_seq', 1, false);


--
-- Name: card_tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.card_tag_id_seq', 1, false);


--
-- Name: column__id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.column__id_seq', 1, false);


--
-- Name: tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.tag_id_seq', 1, false);


--
-- Name: user__id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.user__id_seq', 1, false);


--
-- Name: user_board_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.user_board_id_seq', 1, false);


--
-- Name: board board_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.board
    ADD CONSTRAINT board_pkey PRIMARY KEY (id);


--
-- Name: card card_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.card
    ADD CONSTRAINT card_pkey PRIMARY KEY (id);


--
-- Name: card_tag card_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.card_tag
    ADD CONSTRAINT card_tag_pkey PRIMARY KEY (id);


--
-- Name: column_ column__pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.column_
    ADD CONSTRAINT column__pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);


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
-- Name: user_board user_board_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_board
    ADD CONSTRAINT user_board_pkey PRIMARY KEY (id);


--
-- Name: card card_column_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.card
    ADD CONSTRAINT card_column_id_fkey FOREIGN KEY (column_id) REFERENCES public.column_(id) ON DELETE CASCADE;


--
-- Name: card_tag card_tag_card_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.card_tag
    ADD CONSTRAINT card_tag_card_id_fkey FOREIGN KEY (card_id) REFERENCES public.card(id);


--
-- Name: card_tag card_tag_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.card_tag
    ADD CONSTRAINT card_tag_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tag(id);


--
-- Name: column_ column__board_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.column_
    ADD CONSTRAINT column__board_id_fkey FOREIGN KEY (board_id) REFERENCES public.board(id) ON DELETE CASCADE;


--
-- Name: tag tag_board_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_board_id_fkey FOREIGN KEY (board_id) REFERENCES public.board(id);


--
-- Name: user_board user_board_board_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_board
    ADD CONSTRAINT user_board_board_id_fkey FOREIGN KEY (board_id) REFERENCES public.board(id) ON DELETE CASCADE;


--
-- Name: user_board user_board_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_board
    ADD CONSTRAINT user_board_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_(id);


--
-- PostgreSQL database dump complete
--

